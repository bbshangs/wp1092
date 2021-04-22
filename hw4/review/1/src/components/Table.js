import React, { useState } from "react";
import Row from "./Row";

export default function Table(props) {
    const [tableData, setTableData] = useState({})

    let rows = []
    // header
    rows.push(<Row  key={`row-header`}
                    rowId={0}
                    rowData={" ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')}
                    colCount={27}/>)

    for (let i = 1; i < props.rowCount + 1; ++i){
        const rowData = tableData[i] || {}
        rowData[0] = i;
        rows.push(
            <Row key={`row-${i}`}
                 rowId={i}
                 rowData={rowData}
                 colCount={props.colCount + 1} />
        )
    }

    return (
        <div className="table">
            {rows}
        </div>
    )
}