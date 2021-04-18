import React, {useState} from 'react';

export default function Cell(props) {
    const [display, setDisplay] = useState(props.value);
    var timer = 0, delay = 200, prevent = false;

    const handleClick = (e) => {
        console.log("one");
        timer = setTimeout(() => {
            if (!prevent) {
                setDisplay(props.value);
                props.updataSelectedCell(props.curCol, props.curRow);
                props.updataEditingCell(null, null);
            }
            prevent = false;
        }, delay)
    }
    const handleDoubleClick = (e) => {
        console.log("double");
        clearTimeout(timer);
        prevent = true;
        setDisplay(props.value);
        props.updataEditingCell(props.curCol, props.curRow);
        props.updataSelectedCell(null, null);
    }
    const handleBlur = (e) => {
        props.updateData(e.target.value, props.curCol, props.curRow);
        props.updataEditingCell(null, null);
        props.updataSelectedCell(null, null);
    }
    const handleChange = (e) => {
        setDisplay(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            props.updateData(e.target.value, props.curCol, props.curRow);
            if (props.curRow < props.rowNum - 1) {
                props.updataEditingCell(null, null)
                props.updataSelectedCell(props.curCol, props.curRow + 1);
            }
                
        }
    }
    const handleKeyPressOnSelect = (e) => {
        if (e.key !== "Enter") {
            setDisplay("");
            props.updataEditingCell(props.curCol, props.curRow)
            props.updataSelectedCell(null, null);
        }
        else {
            props.updateData(e.target.value, props.curCol, props.curRow);
            if (props.curRow < props.rowNum - 1) {
                props.updataEditingCell(null, null)
                props.updataSelectedCell(props.curCol, props.curRow + 1);
            }
        }
    }
    if (props.curCol === props.editingCol && props.curRow === props.editingRow) {  //double-click
        var css_edit = {border: '2px solid #1E90FF'};
        return (
            <td style={css_edit}>
                <input 
                    type="text"
                    value={display}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    autoFocus
                />
            </td>
        )
    }
    else if (props.curCol === props.selectedCol && props.curRow === props.selectedRow) {  //single-click
        var css_selected = {border: '2px solid #1E90FF'};
        var input_selected = {caretColor: 'transparent', backgroundColor: '#F0F8FF'};
        return (
            <td style={css_selected}>
                <input 
                    style={input_selected}
                    type="text"
                    value={display}
                    onKeyDown={handleKeyPressOnSelect}
                    onBlur={handleBlur}
                    autoFocus
                    readOnly
                />
            </td>
        )
    }
    return (
        <td
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >{props.value}
        </td>
    )
}