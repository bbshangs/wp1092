import { useState } from "react"; 
import { message } from "antd";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);

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

    const createChatBox = (server, me, friend) => {
        const newKey = me <= friend ?
                `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            displayStatus({
                type: "error",
                msg: `${friend}'s chat box has already opened.`,
            });
            return null;
        }
        server.sendEvent({
            type: 'CHAT',
            data: { to: friend, name: me },
        });
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

    const onEvent = (e, me, activeKey) => {
        const { type } = e;
        const splitedKey = activeKey.split("_");
        const friend = (splitedKey[0] == me) ? splitedKey[1] : splitedKey[0];

        switch (type) {
          case 'CHAT': {
            const newChatBoxes = [...chatBoxes];
            newChatBoxes.push({ friend: friend, key: activeKey, chatLog: e.data.messages });
            setChatBoxes(newChatBoxes);
            console.log("My name: ", me);
            break;
          }
          case 'MESSAGE': {
            console.log("data!!!! ", e.data.message);
            const newChatBoxes = [...chatBoxes];
            for (let i = 0; i < chatBoxes.length; i++) {
                if (chatBoxes[i].key === activeKey) {
                    newChatBoxes[i].chatLog.push(e.data.message);
                    setChatBoxes(newChatBoxes)
                    break;
                }
            }
            break;
          }
        }
      };
    return { chatBoxes, createChatBox, removeChatBox, onEvent };
};

export default useChatBox;