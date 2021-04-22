import React, { Component } from "react";
import Table from "../components/Table";

class FakeSheet extends Component {
    nextColumnString (curr) {
        if (curr === '')
            return 'A'
        if (curr[curr.length - 1] === 'Z')
            return this.nextColumnString(curr.substring(0, curr.length - 1)) + 'A';
        else
            return curr.substring(0, curr.length - 1) + String.fromCharCode(curr.charCodeAt(curr.length - 1) + 1);
    }

    render() {
        return (
            <div>
                <Table rowCount={100} colCount={26} />
            </div>
        );
    }
}

export default FakeSheet;

