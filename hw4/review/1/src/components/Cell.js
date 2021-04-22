import React, { useState } from "react";

export default function Cell(props) {
    let className = "";
    if (props.rowId != 0 && props.colId != 0) className += "cell";
    else {
        if (props.rowId == 0) className += " first-row";
        if (props.colId == 0) className += " first-column";
    }

    const [chosen, setChosen] = useState({selected: false, focused: false})

    let click = () => setChosen({selected: true, focused: false})
    let doubleClick = () => setChosen({selected: false, focused: true})

    if (props.rowId != 0 && props.colId != 0)
        return (
            <input  type="text"
                    className={`${className}${chosen.selected ? " active" : chosen.focused ? " focus" : ""}`}
                    onClick={click}
                    onDoubleClick={doubleClick}
                    placeholder={props.cellData}>
            </input>
        )
    else
        return (
            <div    className={className}>
                {props.cellData}
            </div>
        )
}