import { useState, useEffect } from "react";
import useChatBox from "./useChatBox";

// import useChatBox from "./useChatBox";

// import uuid from "uuid";

const client = new WebSocket("ws://localhost:4000");

const useChat = (addMsg, setMsg) => {
  const [messages, setMessages] = useState([]);
  const { chatBoxes, createChatBox, removeChatBox, setChatBoxes } =
    useChatBox();
  client.onmessage = (byteString) => {
    // console.log(byteString.data);
    // const { Data } = byteString;

    const { type, data } = JSON.parse(byteString.data);
    switch (type) {
      case "CHAT": {
        // console.log(`Recieve CHAT:${data.messages}`);
        // setMessages(() => data.messages);
        const msgs = data.messages;
        setMsg(msgs);
        break;
      }
      case "MESSAGE": {
        // console.log(`Recieve MESSAGE:${data.message}`);
        const { name, body } = data.message;
        // console.log(name, body);
        // setMessages(() => [name, body]);
        addMsg({ name: name, body: body });
        break;
      }
      default:
        break;
    }
  };
  // { key, msg }
  const sendMessage = async (payload) => {
    console.log(`Sending message`);
    await client.send(JSON.stringify(payload));
    // sendData(["input", payload]);
  };

  const clearMessages = () => {
    // sendData(["clear"]);
  };

  // const [status, setStatus] = useState({});
  // const sendMessage = (payload) => {
  //   console.log(payload);
  // };

  return { sendMessage, messages };
};
export default useChat;
