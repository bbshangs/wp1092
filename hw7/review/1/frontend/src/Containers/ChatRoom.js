import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "./ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import ChatLog from "./ChatLog";

const { TabPane } = Tabs;

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [a, setA] = useState(true);
  const { chatBoxes, createChatBox, removeChatBox, setChatBoxes } =
    useChatBox();
  const reload = () => {
    setA((pre) => !pre);
  };
  const setMsg = (msg) => {
    // console.log(msg);
    // console.log(...msg);

    let boxes = [...chatBoxes];
    const a = boxes.filter((chatBox) => {
      return chatBox.key === activeKey;
    });
    a[0].chatLog.push(...msg);
    reload();
  };
  const addMsg = (msg) => {
    // console.log(msg);
    let boxes = [...chatBoxes];
    const a = boxes.filter((chatBox) => {
      return chatBox.key === activeKey;
    });
    a[0].chatLog.push(msg);
    reload();
  };
  // useEffect(() => {}, []);
  const { sendMessage, messages } = useChat(addMsg, setMsg);
  const addChatBox = () => {
    setModalVisible(true);
  };
  const Send = async (msg) => {
    const tmp = activeKey.split("_");
    // const name = tmp[0];
    // const to = tmp[1];
    const to = tmp[0] === me ? tmp[1] : tmp[0];
    console.log(me, to);
    await sendMessage({
      data: {
        name: me,
        to: to,
        body: msg,
      },
      type: "MESSAGE",
    });
    // let boxes = [...chatBoxes];
    // const a = boxes.filter((chatBox) => {
    //   return chatBox.key === activeKey;
    // });
    // console.log(`msg:${messages}`);
    // a[0].chatLog.push(messages);
    // boxes[activeKey]["chatLog"].push(messages);
  };
  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove")
              setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                {chatLog.map((m) => {
                  return <ChatLog data={m} me={me} />;
                })}
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            sendMessage({ data: { name: name, to: me }, type: "CHAT" });
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
          Send(msg);
          // sendMessage({ key: activeKey, body: msg, type: "MESSAGE" });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
