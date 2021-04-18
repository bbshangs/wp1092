import React from 'react';

export default function TableHeadCell(props) {
    var curTableHead;
    if (props.curTableHead === 0) {
        curTableHead = "";
    }
    else {
        curTableHead = String.fromCharCode(props.curTableHead + 64);
    }
        
    const css_focusColor = (props.curTableHead - 1 === props.selectedCol || props.curTableHead - 1 === props.editingCol)? {backgroundColor: 'gray'} : {};
    return(
        <th style={css_focusColor}>{curTableHead}</th>
    );
}