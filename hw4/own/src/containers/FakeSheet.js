import React, { useState } from "react";
import HeaderColumn from "../components/HeaderColumn";
import HeaderRow from "../components/HeaderRow";
import Table from "../components/Table";

export default function FakeSheet() {
    const [colNum, setColNum] = useState(10); //26
    const [rowNum, setRowNum] = useState(10); //100
    const initialData = [...Array(rowNum)].map(e => Array(colNum).fill(""));
    const [data, setData] = useState(initialData);
    const [selectedCol, setSelectedCol] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editingCol, setEditingCol] = useState(null);
    const [editingRow, setEditingRow] = useState(null);

    const handleAddColumn = () => {
        const focusedCol = (editingCol !== null)? editingCol : ((selectedCol != null)? selectedCol : null);
        console.log("focusedCol=", focusedCol);
        if (focusedCol === null) {
            console.log("add to last column");
            setData((prev) => {
                return prev.map((row) => {
                    return [...row, ""];
                });
            });
        }
        else {
            setData((prev) => {
                return prev.map((row) => {
                    return [...row.slice(0, focusedCol), "", ...row.slice(focusedCol, colNum)]
                });
            });
        }
        setColNum((prev) => (prev + 1));
        updataEditingCell(null, null);
        updataSelectedCell(null, null);
    };

    const handleDelColumn = () => {
        const focusedCol = (editingCol !== null)? editingCol : ((selectedCol !== null)? selectedCol : null);
        if (focusedCol !== null) {
            setData((prev) => {
                return prev.map((row) => {
                    return [...row.slice(0, focusedCol), ...row.slice(focusedCol + 1, colNum)]
                });
            });
            setColNum((prev) => (prev - 1));
        }
        updataEditingCell(null, null);
        updataSelectedCell(null, null);
    };

    const handleAddRow = () => {
        const focusedRow = (editingRow !== null)? editingRow : ((selectedRow !== null)? selectedRow : null);
        console.log("focusedRow=", focusedRow);
        const newRow = Array(colNum).fill("");
        if (focusedRow === null) {
            console.log("add to last row");
            setData((prev) => [...prev, newRow]);
        }
        else {
            setData((prev) => {
                return [
                    ...prev.slice(0, focusedRow), 
                    newRow, 
                    ...prev.slice(focusedRow, rowNum)
                ];
            });
        }
        setRowNum((prev) => (prev + 1));
        updataEditingCell(null, null);
        updataSelectedCell(null, null);
        // console.log(data);
    };

    const handleDelRow = () => {
        const focusedRow = (editingRow !== null)? editingRow : ((selectedRow !== null)? selectedRow : null);
        if (focusedRow !== null) {
            setData((prev) => {
                return [...prev.slice(0, focusedRow), ...prev.slice(focusedRow + 1, rowNum)]
            });
            setRowNum((prev) => (prev - 1));
        }
        updataEditingCell(null, null);
        updataSelectedCell(null, null);
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


// Reference:
// https://stackoverflow.com/questions/64901599/typeerror-arr-slice-is-not-a-function-or-its-return-value-is-not-iterable
// https://stackoverflow.com/questions/24812371/deleting-a-column-from-a-multidimensional-array-in-javascript/24812663