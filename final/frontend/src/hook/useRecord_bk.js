import { useState } from "react";

const useRecord = () => {
    // const [records, setRecords] = useState([
    //     { name: "早餐", description: "hello", value: 150, lender: "Michelle", borrowers: [] },
    //     { name: "晚餐", description: "hihihihi", value: 300, lender: "Michelle", borrowers: [] }
    // ]);
    const [records, setRecords] = useState([]);

    // get all members and records
    const queryRecord = () => {
        // console.log(records);
        // console.log(members);
        setRecords([
            { name: "早餐", description: "hello", value: 150, lender: "Michelle", borrowers: [] },
            { name: "晚餐", description: "hihihihi", value: 300, lender: "Michelle", borrowers: [] }
        ]);
        // console.log("hello");
        // console.log(records);
        // console.log(members);
    };
    // add a record
    // const addRecord = () => {

    // }

    return { records, queryRecord };
};

export default useRecord;