import { useState } from "react"; 
import { message } from "antd";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    // const [chatBoxes, setChatBoxes] = useState([ 
    //     { friend: "Mary", key: "MaryChatbox", chatLog: [] },
    //     { friend: "Peter", key: "PeterChatBox", chatLog: [] } 
    // ]);
    const displayStatus = (payload) => {
        if (payload.msg) {
          const { type, msg } = payload
          const content = {
            content: msg,
            duration: 0.5
          }
          switch(type) {
            case 'success':
              message.success(content)
              break
            case 'error':
            default:
              message.error(content)
              break
          }
        }
      }

    const createChatBox = (me, friend) => {
        const newKey = me <= friend ?
                `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            // throw new Error(friend + "'s chat box has already opened.");
            displayStatus({
                type: "error",
                msg: `${friend}'s chat box has already opened.`,
            });
            return null;
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        return newKey;
    };
    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }});
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key;
            } else { newActiveKey = newChatBoxes[0].key; }
          }
        } else newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes);
        return newActiveKey;
    };
    return { chatBoxes, createChatBox, removeChatBox };
};

export default useChatBox;