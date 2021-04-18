import React from 'react';

export default function HeaderColumn(props) {
    const handleAddRow = () => {
        props.handleAddRow();
    };
    const handleDelRow = () => {
        props.handleDelRow();
    };

    return (
        <div className="c0">
            <button id="top-left" onMouseDown={handleAddRow}>+</button>
            <button onMouseDown={handleDelRow}>-</button>
        </div>
    );
}



