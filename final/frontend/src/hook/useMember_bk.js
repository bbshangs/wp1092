import { useState, useEffect } from "react";

const useMember = () => {
    // const [members, setMember] = useState([
    //     "Michelle", "Edward", "bb", "Sherry", "尚沂瑾", "林則仰", "本本"
    // ]);
    const [members, setMember] = useState([]);

    // get all members and records
    const queryMember = (server, me, room) => {
        server.sendEvent({
            type: 'MEMBERS',
            data: { room }
        })
    };
    console.log("out members = ", members);
    // add a record
    // const addRecord = () => {

    // }

    return { members, queryMember };
};

export default useMember;