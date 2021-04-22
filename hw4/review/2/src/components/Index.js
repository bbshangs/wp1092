import React from "react";
export default ({len, dark}) => {
    return <div class="index_box">{intToIndex(len, dark)}</div>;
}

function intToIndex(n, d) {
    let idx = [];
    for (let i = 0; i < n; ++i) {
        if (i != d) {
            idx.push(<div>{i + 1}</div>);
        } else {
            idx.push(<div class="dark">{i + 1}</div>);
        }
    }
    return idx;
}