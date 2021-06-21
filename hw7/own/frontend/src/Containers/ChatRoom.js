import "../App.css";
import { useState } from "react"; 
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');
server.sendEvent = (e) => server.send(JSON.stringify(e));

const { TabPane } = Tabs; 
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox, onEvent } = useChatBox();
    const { sendMessage } = useChat();
    const addChatBox = () => { setModalVisible(true); };

    
    server.onmessage = (m) => {
        console.log("activeKey = ", activeKey);
        onEvent(JSON.parse(m.data), me, activeKey);
    };
    
    return (
        <> 
            <div className="App-title">
                <h1>{me}'s Chat Room</h1> 
            </div> 
            <div className="App-messages"> 
                <Tabs 
                    type="editable-card" 
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox(); 
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                    }}
                >
                    {chatBoxes.map((
                        { friend, key, chatLog }) => {
                            return (
                                <TabPane 
                                    tab={friend}
                                    key={key} 
                                    closable={true}
                                >
                                    {chatLog.map(({ name, body}) => {
                                        const chat_class = (me == name)? ("chat-message-group writer-user"):("chat-message-group");
                                        return (
                                            <div class="card-content chat-content">
                                                <div class="content">
                                                    <div class={chat_class}>
                                                        <div class="chat-messages">
                                                            <div class="message">{body}</div>
                                                            <div class="from">{name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    
                                </TabPane>
                            );
                        })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        const key = createChatBox(server, me, name);
                        if (key)
                            setActiveKey(key);
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div> 
            <Input.Search
                value={messageInput} 
                onChange={(e) => setMessageInput(e.target.value)} 
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message.",
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first.",
                        });
                        setMessageInput("");
                        return;
                    }
                    sendMessage(server, { me: me, key: activeKey, body: msg });
                    setMessageInput("");
                }}
            ></Input.Search> 
        </>
    );
};
export default ChatRoom;
                             