import mongoose from 'mongoose';
import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import path from 'path';
import { v4 as uuid } from 'uuid';
import mongo from './mongo.js';
import dotenv from "dotenv-defaults";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

const { Schema } = mongoose;

/*schema define*/

const userSchema = new Schema({
    name: {type: String, required : true},
    room: {type : mongoose.Types.ObjectId, ref : 'Room'},
});

const recordSchema = new Schema({
    name: {type: String, required : true},
    description: {type: String},
    date: {type: String, required : true},
    value: {type: Number, required : true},
    lender: {type : mongoose.Types.ObjectId, ref: 'User'},
    borrower: [{type : mongoose.Types.ObjectId, ref: 'User'}],
});

const roomSchema = new Schema({
    name: {type: String, required : true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    records: [{type : mongoose.Types.ObjectId, ref: 'Record' }],
});

const UserModel = mongoose.model('User', userSchema);
const RecordModel = mongoose.model('Record', recordSchema);
const RoomModel = mongoose.model('Room', roomSchema);

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server,
});

app.use(express.static(path.join(__dirname, 'public')));

const validUser = async (name) => {
    const existing = await UserModel.findOne({ name });
    if(existing){
        //console.log("exist!");
        return existing;
    }
    else return await new UserModel({ name }).save();
};

const validRoom = async (name, nowUser) => {
    let room = await RoomModel.findOne({ name : name });
    //console.log('createing room with name ' + name);
    if(!room) room = await new RoomModel({ name }).save();
    //console.log('creation success!');
    if(nowUser != null){
        if(!room.users.includes(nowUser.id)){
            //console.log("doesn't include");
            room.users.push(nowUser);
            await room.save();
        }
    }
    return room.populate('users').populate({
        path : 'records',
        populate : [{path : 'lender'}, {path : 'borrower' }] //populate records' lender and borrower
    }).execPopulate();
}
const user_client = {};

wss.on('connection', function connection(client){
    client.id = uuid();
    client.sendEvent = (e) => client.send(JSON.stringify(e));
    const returnBackToClient = (room) => {
        const sendMsg = room.records.map(({_id, name, description, date, value, lender, borrower}) => {
            //console.log(borrower);
            const allBorrower = borrower.map((item) => {return item.name});
            const res = {
                id : _id, 
                name : name,
                description : description,
                date : date,
                value : value,
                lender : lender.name,
                borrower : allBorrower,
            };
            return res;
        });
        console.log("msg:");
        console.log(sendMsg);
        const backToClient = {
            type : 'ALL_RECORDS',
            data : sendMsg,
        };
        return backToClient;
    }
    const findNextIndex = (index, cal, isPos) => {
        let ans = -1;
        for(let i = index + 1; i < cal.length; i++) {
            if(cal[i].value == 0) continue;
            if(!(isPos ^ (cal[i].value > 0))){
                ans = i;
                break;
            }
        }
        return ans;
    }
    client.on('message', async function imcoming(message){
        message = JSON.parse(message); //parse to JSON

        const { type } = message; //get type of msg from client

        switch(type){
            //signIn
            case 'SIGNIN_ENTER': {
                const { 
                    data : { userName, roomName},
                } = message;
                //console.log("Sign in ... " + userName + ", " + roomName);
                if(!userName || !roomName){
                    break;
                }
                const nowUser = await validUser(userName);
                const thisRoom = await RoomModel.findOne({name : roomName});
                if(!thisRoom){
                    client.sendEvent({
                        type : 'SIGNIN_ENTER',
                        data : false,
                    });
                }
                else{
                    const nowRoom = await validRoom(roomName, nowUser); //return room with adding user
                    nowUser.room = nowRoom;
                    await nowUser.save();
                    if (!user_client[roomName]) user_client[roomName] = new Set();
                    user_client[roomName].add(client);
                    client.sendEvent({
                        type : 'SIGNIN_ENTER',
                        data : true,
                    });
                }
                break;
            }
            case 'SIGNIN_CREATE': {
                const { 
                    data : { userName, roomName},
                } = message;
                //console.log("Sign in ... " + userName + ", " + roomName);
                if(!userName || !roomName){
                    break;
                }
                const nowUser = await validUser(userName);
                const thisRoom = await RoomModel.findOne({name : roomName});
                if(!thisRoom){
                    const nowRoom = await validRoom(roomName, nowUser); //return room with adding user
                    nowUser.room = nowRoom;
                    await nowUser.save();
                    if (!user_client[roomName]) user_client[roomName] = new Set();
                    user_client[roomName].add(client);
                    client.sendEvent({
                        type : 'SIGNIN_CREATE',
                        data : true,
                    });
                }
                else{
                    client.sendEvent({
                        type : 'SIGNIN_CREATE',
                        data : false,
                    });
                }
                break;
            }
            case 'ADD_RECORD': {
                console.log('get add record query');
                const { 
                    data  : { name, value, lender, borrower, date, description, roomName},
                } = message;

                const nowLender = await validUser(lender);

                const borrowerList = [];

                for(let i = 0; i < borrower.length; i++) {
                    const tmp = await validUser(borrower[i]);
                    borrowerList.push(tmp);
                }

                const sendDescription = (description != null) ? description : "";
                const nowRecord = new RecordModel({ name, description : sendDescription, date, value, lender : nowLender, borrower : borrowerList});
                await nowRecord.save();

                const nowRoom = await validRoom(roomName, null);

                nowRoom.records.push(nowRecord);
                await nowRoom.save();
                const backToClient = returnBackToClient(nowRoom);

                user_client[roomName].forEach((client) => {
                    client.sendEvent(backToClient);
                });

                break;
            }
            case 'ALL_RECORD': {
                console.log('get all record query');
                const { 
                    data : { roomName }
                } = message;

                const nowRoom = await validRoom(roomName, null);

                client.sendEvent(returnBackToClient(nowRoom));
                break;
            }
            case 'MEMBERS': {
                console.log('get member query');
                const {
                    data : { roomName }
                } = message;

                const nowRoom = await validRoom(roomName, null);

                const sendMembers = nowRoom.users.map((item) => {
                    return item.name;
                });
                client.sendEvent({
                    type : 'MEMBERS',
                    data : sendMembers,
                });
                break;
            }
            case 'BALANCE': {
                console.log('get belance query');
                const {
                    data : { roomName }
                } = message;

                var cal = [];
                var name_list = [];
                var record_list = [];
                var cnt = 0;

                const nowRoom = await validRoom(roomName,null);
                nowRoom.users.forEach((item) => {
                    cal[cnt] = {name : item.name, value : 0};
                    name_list[item.name] = cnt;
                    cnt++;
                });
                nowRoom.records.forEach((record) => {
                    const split_price = record.value / record.borrower.length;
                    cal[name_list[record.lender.name]].value += record.value;
                    record.borrower.forEach((item) =>{
                        cal[name_list[item.name]].value -= split_price;
                    });
                });
                //console.log("cal list:");
                //console.log(cal);
                var add_ptr = -1;
                var minus_ptr = -1;
                add_ptr = findNextIndex(add_ptr, cal, true);
                minus_ptr = findNextIndex(minus_ptr, cal, false);
                while(add_ptr != -1 && minus_ptr != -1){
                    const trans = Math.min(cal[add_ptr].value, -cal[minus_ptr].value);
                    cal[add_ptr].value -= trans;
                    cal[minus_ptr].value += trans;
                    //console.log("add_ptr.value:" + cal[add_ptr].value);
                    //console.log("min_ptr.value:" + cal[minus_ptr].value);
                    record_list.push({
                        from : cal[minus_ptr].name,
                        to : cal[add_ptr].name,
                        value : Math.round(trans * 100) / 100,
                    });
                    if(Math.abs(cal[add_ptr].value) < 1e-6){
                        add_ptr = findNextIndex(add_ptr, cal, true);
                    }
                    if(Math.abs(cal[minus_ptr].value) < 1e-6){
                        minus_ptr = findNextIndex(minus_ptr, cal, false);
                    }
                }
                console.log("balance info");
                console.log(record_list);
                client.sendEvent({
                    type : 'BALANCE',
                    data : record_list,
                });
                break;
            }
            case 'CLEAR_ALL' : {
                const {
                    data : { roomName }
                } = message;
                
                const nowRoom = await validRoom(roomName, null);
                nowRoom.records.forEach(async (item) => {
                    await RecordModel.deleteOne({_id : item._id});
                })
                while(nowRoom.records.length) nowRoom.records.pop();
                await nowRoom.save();
                client.sendEvent(returnBackToClient(nowRoom));
                break;
            }
            case 'DELETE' : {
                const {
                    data : { roomName, recordID }
                } = message;
                const nowRoom = await validRoom(roomName,null);
                var remove_ptr = -1;
                for(let i = 0; i < nowRoom.records.length ; i++){
                    if(nowRoom.records[i]._id == recordID){
                        remove_ptr = i;
                        break;
                    }
                }
                nowRoom.records.splice(remove_ptr, 1);
                await nowRoom.save();
                await RecordModel.deleteOne({_id : recordID});
                client.sendEvent(returnBackToClient(nowRoom));
                break;
            }
        }
    });
});

mongo.connect();

server.listen(8787, () => {
   console.log('Server listening at http://localhost:8787');
});