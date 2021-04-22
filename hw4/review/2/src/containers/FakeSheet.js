import React, { Component } from "react";
import Header from "../components/Header";
import Index from "../components/Index";
import Sheet from "./Sheet";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: new Array(100).fill().map(() => new Array(26).fill("")),
            // shape: [100, 26],
            cursor: [-1, -1],
            prev: [-1, -1],
            // inputRefToFocus: null,
            // inputRef = new Array(100).fill().map(() => new Array(26)),
        };
    }

    focusOnCell = (ro, co) => {
        let c = this.state.cursor;
        this.setState({prev: c});
        this.setState({cursor: [ro, co]});
        // console.log(this.state.cursor);
    }

    // setRef = (ref, i, j) => {
    //     let r = this.state.inputRef;
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props !== prevProps) {
    //         if (this.props.now[0] !== -1 && this.props.now[1] !== -1 && this.inputRef[this.props.now[0]][this.props.now[1]] !== undefined) {
    //             this.inputRef[this.props.now[0]][this.props.now[1]].focus();
    //         }
    //     }
    // }

    // setInputRefToFocus = (ref) => {
    //     this.setState({inputRefToFocus: ref});
    // }

    modifyColumn = (m) => {
        // let temp = this.state.shape[1] + m;
        // if (temp >= 0) {
        //     this.setState({shape: [this.state.shape[0], temp]});
        // }
        let c = this.state.content;
        if (this.state.prev !== [-1, -1]) {
            if (m === 1) {
                for (let i = 0; i < c.length; ++i) {
                    c[i].splice(this.state.prev[1], 0, "");
                    this.focusOnCell(this.state.prev[0], this.state.prev[1] + 1);
                }
            } else {
                for (let i = 0; i < c.length; ++i) {
                    c[i].splice(this.state.prev[1], 1);
                    this.focusOnCell(-1, -1);
                }
            }
        } else {
            if (m === 1) {
                for (let i = 0; i < c.length; ++i) {
                    c[i].push("");
                    this.focusOnCell(-1, -1);
                }
            } else {
                for (let i = 0; i < c.length; ++i) {
                    c[i].pop();
                    this.focusOnCell(-1, -1);
                }
            }
        }
        this.setState({content: c});
    }

    modifyRow = (m) => {
        // let temp = this.state.shape[0] + m;
        // if (temp >= 0) {
        //     this.setState({shape: [temp, this.state.shape[1]]});
        // }
        let c = this.state.content;
        if (this.state.prev !== [-1, -1]) {
            if (m === 1) {
                c.splice(this.state.prev[0], 0, new Array(c[0].length).fill(""));
                this.focusOnCell(this.state.prev[0] + 1, this.state.prev[1]);
            } else {
                c.splice(this.state.prev[0], 1);
                this.focusOnCell(-1, -1);
            }
        } else {
            if (m === 1) {
                c.push(new Array(c[0].length).fill(""));
                this.focusOnCell(-1, -1);
            } else {
                c.pop();
                this.focusOnCell(-1, -1);
            }
        }
        this.setState({content: c});
    }

    render() {
        console.log("cursor:", this.state.cursor, "previous:", this.state.prev);
        return (
            <>
                <Sheet content={this.state.content} pos={this.focusOnCell} now={this.state.cursor}/>
                <Header len={this.state.content[0].length} dark={this.state.cursor[1]}/>
                <Index len={this.state.content.length} dark={this.state.cursor[0]}/>
                <div id="no_use"></div>
                <div class="change_column">
                    <div class="column_button">
                        <button id="add_column" onClick={() => this.modifyColumn(1)}>+</button>
                        <button id="erase_column" onClick={() => this.modifyColumn(-1)}>-</button>
                    </div>
                </div>
                <div class="change_row">
                    <div class="row_button">
                        <button id="add_row" onClick={() => this.modifyRow(1)}>+</button>
                        <button id="erase_row" onClick={() => this.modifyRow(-1)}>-</button>
                    </div>
                </div>
            </>
        );
    }
}

export default FakeSheet;

