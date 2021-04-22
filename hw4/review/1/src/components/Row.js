import React, { useState } from "react";
import Cell from "./Cell";

export default function Row(props) {
    let cells = []
    for (let colId = 0; colId < props.colCount; ++colId){
        let cellData = props.rowData[colId] || "";

        cells.push(<Cell key={`cell-${props.rowId}-${colId}`}
                         rowId={props.rowId}
                         colId={colId}
                         cellData={cellData}/>)
    }

    return (
        <div className="row">
            {cells}
        </div>
    )
}