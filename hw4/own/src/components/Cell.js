import React, {useState} from 'react';

export default function Cell(props) {
    const [display, setDisplay] = useState(props.value);
    const [changeEdit, setChangeEdit] = useState(false);
    const [changeSelect, setChangeSelect] = useState(false);
    var timer = 0, delay = 200, prevent = false;

    const handleClick = (e) => {
        timer = setTimeout(() => {
            if (!prevent) {
                setDisplay(props.value);
                props.updataSelectedCell(props.curCol, props.curRow);
                props.updataEditingCell(null, null);
                setChangeEdit(false);
                setChangeSelect(false);
            }
            prevent = false;
        }, delay)
    }
    const handleDoubleClick = (e) => {
        clearTimeout(timer);
        prevent = true;
        setDisplay(props.value);
        props.updataEditingCell(props.curCol, props.curRow);
        props.updataSelectedCell(null, null);
        setChangeEdit(false);
        setChangeSelect(false);
    }
    const handleBlur = (e) => {
        props.updateData(e.target.value, props.curCol, props.curRow);
        props.updataEditingCell(null, null);
        props.updataSelectedCell(null, null);
        setChangeEdit(false);
        setChangeSelect(false);
    }
    const handleChange = (e) => {
        setDisplay(e.target.value);
        setChangeEdit(true);
        setChangeSelect(false);
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            props.updateData(e.target.value, props.curCol, props.curRow);
            if (props.curRow < props.rowNum - 1) {
                props.updataEditingCell(null, null)
                props.updataSelectedCell(props.curCol, props.curRow + 1);
            }
            setChangeEdit(false);
            setChangeSelect(false);
        }
    }
    const handleKeyPressOnSelect = (e) => {
        if (e.key !== "Enter") {
            setDisplay("");
            setChangeEdit(true);
            setChangeSelect(true);
            props.updataEditingCell(props.curCol, props.curRow)
            props.updataSelectedCell(null, null);
        }
        else {
            setChangeEdit(false);
            setChangeSelect(false);
            props.updateData(e.target.value, props.curCol, props.curRow);
            if (props.curRow < props.rowNum - 1) {
                props.updataEditingCell(null, null)
                props.updataSelectedCell(props.curCol, props.curRow + 1);
            }
        }
    }
    if (props.curCol === props.editingCol && props.curRow === props.editingRow) {  //double-click
        var css_edit = {border: '2px solid #1E90FF'};
        var displayValue_edit = (changeEdit)? display : props.value;
        return (
            <td style={css_edit}>
                <input 
                    type="text"
                    value={displayValue_edit}
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
        var displayValue_selected = (changeSelect)? display : props.value;
        return (
            <td style={css_selected}>
                <input 
                    style={input_selected}
                    type="text"
                    value={displayValue_selected}
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