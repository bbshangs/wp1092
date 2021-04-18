import React from 'react';

export default function AlphabetRow(props) {
    const cells = [];
    for (let i = 0; i < props.colNum; i++) {
        cells.push(
            <Cell 
                value={props.rowData[i] || ""}
            />
        );
    }

    return (
        <tr>
            <td>{props.curRow + 1}</td>
            {cells}
        </tr>
    );
}