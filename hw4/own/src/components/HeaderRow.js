import React from 'react';

export default function HeaderRow(props) {
    const handleAddColumn = () => {
        // props.updataSelectedCell(, );
        props.handleAddColumn();
    };
    const handleDelColumn = () => {
        // props.updataSelectedCell(, );
        props.handleDelColumn();
    };

    return (
        <div className="r0">
            <button id="left-top" onMouseDown={handleAddColumn}>+</button>
            <button onMouseDown={handleDelColumn}>-</button>
        </div>
    );
}
