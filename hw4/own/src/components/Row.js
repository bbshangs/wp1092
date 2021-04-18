import React from 'react';
import Cell from './Cell';

export default function Row(props) {
    const cells = [];
    var uid, value;

    for (let i = 0; i < props.colNum; i++) {
        uid = [props.uid, i];
        value = props.data[props.curRow][i];
        cells.push(
            <Cell 
                key={uid}
                value={value}
                curCol={i}
                curRow={props.curRow}
                rowNum={props.rowNum}
                uid={uid}
                selectedCol={props.selectedCol}
                selectedRow={props.selectedRow}
                updataSelectedCell={props.updataSelectedCell}
                editingCol={props.editingCol}
                editingRow={props.editingRow}
                updataEditingCell={props.updataEditingCell}
                updateData={props.updateData}
            />
        );
    }
    const css_focusColor = (props.curRow === props.selectedRow || props.curRow === props.editingRow)? {backgroundColor: 'gray'} : {};
    return (
        <tr>
            <td style={css_focusColor}>{props.curRow + 1}</td>
            {cells}
        </tr>
    );

}