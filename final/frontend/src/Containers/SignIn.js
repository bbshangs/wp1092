import "../App.css";
import { Form, Input, Button } from "antd";
import useRoom from "../hook/useRoom";
import {useState, useEffect} from "react";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
};


const SignIn = ({ setMe, setRoom, setSignedIn, server, displayStatus }) => {
    const {canSignIn, getServerRequest, setGetServerRequest, onServerEvent} = useRoom();

    server.onmessage = (m) => {
        onServerEvent(JSON.parse(m.data), null);
    };

    const [thisName, setThisName] = useState("");
    const [thisRoom, setThisRoom] = useState("");
    const [enter, setEnter] = useState(false);

    const onFinish = (values) => {
        setThisName(values.user.name);
        setThisRoom(values.user.room);
        if (enter) {
            console.log("SIGNIN_ENTER");
            server.sendEvent({
                type: "SIGNIN_ENTER",
                data: { userName: values.user.name, roomName: values.user.room }
            })
        }
        else {
            console.log("SIGNIN_CREATE");
            server.sendEvent({
                type: "SIGNIN_CREATE",
                data: { userName: values.user.name, roomName: values.user.room }
            })
        }
        
    };
    // const onCreate = (values) => {
    //     setThisName(values.user.name);
    //     setThisRoom(values.user.room);
    //     server.sendEvent({
    //         type: "SIGNIN_CREATE",
    //         data: { userName: values.user.name, roomName: values.user.room }
    //     })
    // }

    useEffect(() => {
        if(getServerRequest){
            if(canSignIn){
                setSignedIn(true); 
                setMe(thisName);
                setRoom(thisRoom);
            }
            else{
                displayStatus({
                    type: "error",
                    msg: "Room is already created or room does not exist!",
                });
            }
            setGetServerRequest(false);
        }
    }, [getServerRequest]);

    return (
        <div className="signin-section">
            <div className="signin-title"><h3>Fortune Dealer</h3></div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input your name"/>
                </Form.Item>
                <Form.Item
                    name={['user', 'room']}
                    label="Room"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input room"/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} onClick={() => {setEnter(true)}}> 
                    <Button type="primary" htmlType="submit" >
                        Enter Room
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} onClick={() => {setEnter(false)}}>
                    <Button type="primary" htmlType="submit" >
                        Create Room
                    </Button>
                </Form.Item>
            </Form>

            {/* <Form {...layout} name="nest-messages" onFinish={onCreate} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input your name"/>
                </Form.Item>
                <Form.Item
                    name={['user', 'room']}
                    label="Room"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input room"/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Create Room
                    </Button>
                </Form.Item>
            </Form> */}
            
        </div> 
    );
 
};

export default SignIn;