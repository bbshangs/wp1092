import React from 'react';
import Row from './Row';
import TableHeadCell from './TableHeadCell';

export default function Table(props) {

    const tableHeads = [];
    for (let i = 0; i <= props.colNum; i++) {
        tableHeads.push(
            <TableHeadCell 
                key={i}
                curTableHead={i}
                selectedCol={props.selectedCol}
                editingCol={props.editingCol}
            />
        )
    }
    
    const rows = [];
    for (let i = 0; i < props.rowNum; i++) {
        rows.push(
            <Row
                key={i}
                curRow={i}
                colNum={props.colNum}
                rowNum={props.rowNum}    
                data={props.data}
                uid={i}
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

    return (
        <table className="table-wrapper">
            <thead><tr>{tableHeads}</tr></thead>
            <tbody>{rows}</tbody>
        </table>
    );

}