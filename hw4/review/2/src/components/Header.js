import React  from "react";
export default ({len, dark}) => {
    return <div class="header_box">{intToHeader(len, dark)}</div>;
}

function intToHeader(n, d) {
    let h = [];
    // console.log(d)
    for (let i = 0; i < n; ++i) {
        if (i !== d) {
            h.push(<div>{intToChar(i)}</div>);
        } else {
            h.push(<div class="dark">{intToChar(i)}</div>);
        }
    }
    return h;
}

function intToChar(n) {
    if (n > 25) {
        return intToChar(Math.trunc(n / 26) - 1) + String.fromCharCode(n % 26 + 65);
    } else {
        return String.fromCharCode(n + 65);
    }
}
