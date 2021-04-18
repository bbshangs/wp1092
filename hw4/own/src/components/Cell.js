import React, {useState, useEffect} from 'react';

export default function Cell(props) {
    // const [display, setDisplay] = useState(props.value);
    const [display, setDisplay] = useState(props.value);
    var timer = 0, delay = 200, prevent = false;


    const handleClick = (e) => {
        console.log("one");
        timer = setTimeout(() => {
            if (!prevent) {
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
                    onKeyPress={handleKeyPressOnSelect}
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
    // const [edit, setEdit] = useState(false);
    // const [selected, setSelected] = useState(false);
    // const [display, setDisplay] = useState(props.value);
    // var timer = 0, delay = 200, prevent = false;

    // const componentDidMount = () => {
    //     window.document.addEventListener('unselectAllEvent', handleUnselectAll);
    // }
    // const componentWillMount = () => {
    //     window.document.removeEventListener('unselectAllEvent', handleUnselectAll);
    // }
    // const handleUnselectAll = () => {
    //     if(edit || selected) {
    //         setSelected(false);
    //         setEdit(false);
    //     }
    // }
    // const emitUnselectAllEvent = () => {
    //     const unselectAllEvent = new Event('unselectAll');
    //     window.document.dispatchEvent(unselectAllEvent);
    // }
    // // const handleKeyPressOnInput = (e) => {
    // //     if (e.key === "Enter") {
    // //         setEditing(false);
    // //         props.handleChange(e.target.value, props.curCol, props.curRow);
    // //     }
    // // }

    // const handleClick = (e) => {
    //     console.log("one");
    //     timer = setTimeout(() => {
    //         if (!prevent) {
    //             emitUnselectAllEvent();
    //             setSelected(true);
    //         }
    //         prevent = false;
    //     }, delay)
    //     props.updataSelectedCell(props.curCol, props.curRow);
    // }
    // const handleDoubleClick = (e) => {
    //     console.log("double");
    //     clearTimeout(timer);
    //     prevent = true;
    //     emitUnselectAllEvent();
    //     setEdit(true);
    //     setSelected(false);
    //     props.updataSelectedCell(props.curCol, props.curRow);
    // }
    // const handleBlur = (e) => {
    //     setEdit(false);
    //     setSelected(false);
    //     props.updateData(e.target.value, props.curCol, props.curRow);
    //     props.updataSelectedCell(null, null);
    // }
    // const handleChange = (e) => {
    //     setDisplay(e.target.value);
    // }

    // if (edit) {  //double-click
    //     var css_edit = {border: '2px solid #1E90FF'};
    //     return (
    //         <td style={css_edit}>
    //             <input 
    //                 type="text"
    //                 value={display}
    //                 onChange={handleChange}
    //                 onBlur={handleBlur}
    //                 autoFocus
    //             />
    //         </td>
    //     )
    // }
    // else if (selected) {  //single-click
    //     var css_selected = {border: '2px solid #1E90FF'};
    //     return (
    //         <td style={css_selected}>
    //             <input 
    //                 type="text"
    //                 value={display}
    //                 onChange={handleChange}
    //                 onBlur={handleBlur}
    //                 autoFocus
    //             />
    //         </td>
    //     )
    // }
    // return (
    //     <td
    //         onClick={handleClick}
    //         onDoubleClick={handleDoubleClick}
    //     >{props.value}
    //     </td>
    // )
}