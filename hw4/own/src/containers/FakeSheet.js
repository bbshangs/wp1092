import React, { useState } from "react";
import HeaderColumn from "../components/HeaderColumn";
import HeaderRow from "../components/HeaderRow";
import Table from "../components/Table";

export default function FakeSheet() {
    const [colNum, setColNum] = useState(10); //26
    const [rowNum, setRowNum] = useState(10); //100
    const initialData = [...Array(rowNum)].map(e => Array(colNum).fill(""));
    // const initialData = [...Array(rowNum)].fill(e => Array(colNum).fill(""));
    const [data, setData] = useState(initialData);
    const [selectedCol, setSelectedCol] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editingCol, setEditingCol] = useState(null);
    const [editingRow, setEditingRow] = useState(null);

    const handleAddColumn = () => {
        console.log("add column");
        setColNum((prev) => (prev + 1));
        // console.log(editingCol);
        // console.log(editingRow);
        const focusedCol = (editingCol)? editingCol : ((selectedCol)? selectedCol : null);
    };
    const handleDelColumn = () => {
        setColNum((prev) => (prev - 1));
    };
    const handleAddRow = () => {
        const focusedRow = (editingRow)? editingRow : ((selectedRow)? selectedRow : null);
        console.log("focusedRow=", focusedRow);
        const newRow = Array(colNum).fill("");
        if (focusedRow === null || focusedRow === rowNum - 1) {
            console.log("add to last row");
            if (Array.isArray(data)) {
                setData((prev) => [...prev, newRow]);
            } else {
                console.error("[arrayReplace] `arr` must be an array.");
            }
        }
        else {
            if (Array.isArray(data)) {
                setData((prev) => {
                    return [
                        ...prev.slice(0, focusedRow), 
                        newRow, 
                        ...prev.slice(focusedRow, rowNum)
                    ];
                });
            } else {
                console.error("[arrayReplace] `arr` must be an array.");
            }
        }
        setRowNum((prev) => (prev + 1));
        updataEditingCell(null, null);
        updataSelectedCell(null, null);
        // console.log(data);
    };
    const handleDelRow = () => {
        setRowNum((prev) => (prev - 1));
    };
    
    const updataSelectedCell = (col, row) => {
        setSelectedCol(col);
        setSelectedRow(row);
    }
    const updataEditingCell = (col, row) => {
        setEditingCol(col);
        setEditingRow(row);
    }
    const updateData = (value, col, row) => {
        // const modifiedData = Object.assign({}, data);
        // if (!modifiedData[row]) 
        //     modifiedData[row] = {};
        // modifiedData[row][col] = value;
        // setData(modifiedData);
        // console.log(data);
        // console.log(typeof data);
        // setData((prev) => (
        //     prev.map((r, id1) => 
        //         id1 === row 
        //         ? (r.map((c, id2) =>
        //             id2 === col
        //             ? {...c, value}
        //             : c)) 
        //         : r
        // )));
        const modifiedData = data;
        modifiedData[row][col] = value;
        setData(modifiedData);
        console.log("(updateData) data = ", data);
    }

    return (
        <div className="wrapper">
            <HeaderColumn 
                handleAddRow={handleAddRow} 
                handleDelRow={handleDelRow}
            />
            <div>
                <HeaderRow 
                    handleAddColumn={handleAddColumn} 
                    handleDelColumn={handleDelColumn}
                />
                <Table 
                    colNum={colNum} 
                    rowNum={rowNum}
                    data={data}
                    selectedCol={selectedCol}
                    selectedRow={selectedRow}
                    updataSelectedCell={updataSelectedCell}
                    updateData={updateData}
                    editingCol={editingCol}
                    editingRow={editingRow}
                    updataEditingCell={updataEditingCell}
                />
            </div>
        </div>
    );
}


