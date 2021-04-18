import React from 'react';

export default function TableHeadCell(props) {
    var curTableHead;

    const idOf = (i) => {
        return (i >= 26 ? idOf((i / 26 >> 0) - 1) : '') +  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26 >> 0];
    }

    if (props.curTableHead === 0) {
        curTableHead = "";
    }
    else {
        // curTableHead = String.fromCharCode(props.curTableHead + 64);
        curTableHead = idOf(props.curTableHead - 1);
    }

    const css_focusColor = (props.curTableHead - 1 === props.selectedCol || props.curTableHead - 1 === props.editingCol)? {backgroundColor: 'gray'} : {};
    return(
        <th style={css_focusColor}>{curTableHead}</th>
    );
}