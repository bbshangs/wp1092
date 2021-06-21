import { useState } from "react";  

const useChat = () => {
    const [status, setStatus] = useState({}); // { type, msg }
    const sendMessage = (server, payload) => {
        console.log(payload);
        const {me, key, body} = payload;

        const splitedKey = key.split("_");
        const friend = (splitedKey[0] == me) ? splitedKey[1] : splitedKey[0];

        server.sendEvent({
            type: 'MESSAGE',
            data: { to: friend, name: me, body: body },
        });

    }; // { key, msg }
    return { status, sendMessage };
};
export default useChat;
