import { useState } from "react";

const useRoom = () => {
    // const [records, setRecords] = useState([
    //     { name: "?—©é¤?", description: "hello", value: 150, lender: "Michelle", borrowers: [] },
    //     { name: "??šé??", description: "hihihihi", value: 300, lender: "Michelle", borrowers: [] }
    // ]);
    // const [members, setMember] = useState([
    //     "Michelle", "Edward", "bb", "Sherry", "å°šæ???‘¾", "??—å??ä»?", "?œ¬?œ¬"
    // ]);
    const [records, setRecords] = useState([]);
    const [members, setMember] = useState([]);
    const [balance, setBalance] = useState("");
    const [canSignIn, setCanSignIn] = useState(true);
    const [getServerRequest, setGetServerRequest] = useState(false);
    const [getBalance, setGetBalance] = useState(false);

    // get all members and records
    const queryMember = (server, room) => {
        server.sendEvent({
            type: 'MEMBERS',
            data: { roomName: room }
        })
    };
    const queryRecord = (server, room) => {
        server.sendEvent({
            type: 'ALL_RECORD',
            data: { roomName: room }
        });
    };
    // add a record
    const addRecord = (server, room, record) => {
        const description = (record.description === undefined)? null: record.description;
        const date = record.date.toDate();
        const date_string = date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate();
        server.sendEvent({
            type: 'ADD_RECORD',
            data: {
                name: record.name,
                value: record.value,
                lender: record.lender, 
                borrower: record.borrowers,
                date: date_string,
                description: description,
                roomName: room
            }
        });
    };
    const doBalance = (server, room) => {
        server.sendEvent({
            type: 'BALANCE',
            data: {
                roomName: room
            }
        });
    };
    const clearAllRecord = (server, room) => {
        server.sendEvent({
            type: 'CLEAR_ALL',
            data: {
                roomName: room
            }
        })
    }
    const deleteRecord = (server, room, id) => {
        server.sendEvent({
            type: 'DELETE',
            data: {
                roomName: room, 
                recordID: id
            }
        })
    }
    const onServerEvent = (m, me) => {
        const { type, data } = m;
        switch (type) {
            case 'MEMBERS': {
                setMember(data);
                break;
            }
            case 'ALL_RECORDS': {
                setRecords(data);
                break;
            }
            case 'BALANCE': {
                console.log(data);
                var newBalance = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].from === me) {
                        newBalance.push(`You should give ${data[i].to} ${data[i].value} dollars!`)
                    }
                    if (data[i].to === me) {
                        newBalance.push(`${data[i].from} should give you ${data[i].value} dollars!`)
                    }
                }
                setBalance(newBalance);
                setGetBalance(true);
                break;
            }
            case 'SIGNIN_ENTER': {
                setCanSignIn(data);
                setGetServerRequest(true);
                break;
            }
            case 'SIGNIN_CREATE': {
                setCanSignIn(data);
                setGetServerRequest(true);
                break;
            }
            break;
        }
    }

    return { members, records, balance, canSignIn, getServerRequest, getBalance, queryMember, queryRecord, addRecord, clearAllRecord, deleteRecord, doBalance, onServerEvent, setGetServerRequest, setGetBalance};
};

export default useRoom;