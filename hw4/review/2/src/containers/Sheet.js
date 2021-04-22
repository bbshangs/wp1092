import React, { Component } from "react";

class Sheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // content: this.initialSheet(),
            // inputRef: new Array(100).fill().map(() => Array(26)),
        };
        // this.inputRef = new Array(100).fill().map(() => Array(26));
    }

    // inputRef = new Array(this.props.content.length).fill().map(() => Array(this.props.content[0].length));

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.now[0] !== -1 && this.props.now[1] !== -1 && this.inputRef[this.props.now[0]][this.props.now[1]] !== undefined) {
                this.inputRef[this.props.now[0]][this.props.now[1]].focus();
            }
        }
    }

    // componentWillUnmount(){
    //     this.inputRef = new Array(this.props.content.length).fill().map(() => new Array(this.props.content[0].length));
    // }

    setContent = (t, i, j) => {
        let c = this.props.content;
        c[i][j] = t;
        this.setState({content: c});
    }

    render() {
        this.inputRef = new Array(this.props.content.length).fill().map(() => new Array(this.props.content[0].length));
        console.log("ref shape:", this.inputRef.length, this.inputRef[0].length)
        let sheet = new Array(this.props.content.length);
        console.log("render:\n")
        for (let i = 0; i < this.props.content.length; ++i) {
            let row = new Array(this.props.content[0].length);
            for (let j = 0; j < this.props.content[0].length; ++j) {
                // row[j] = <Cell idx={[i, j]} text={this.props.content} pos={this.props.now} changeContent={this.setContent} focusFunc={this.props.pos}/>
                row[j] = <input type="text"
                                ref={input => {if(this.inputRef[i]) {this.inputRef[i][j] = input}}}
                                value={this.props.content[i][j]}
                                onClick={(e) => {e.target.select()}}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (this.props.now[0] >= 0 && this.props.now[0] < this.props.content.length - 1) {
                                            e.target.blur();
                                            this.props.pos(i + 1, j);
                                        }
                                    }
                                }}
                                onChange={(e) => this.setContent(e.target.value.trim(), i, j)}
                                onBlur={() => this.props.pos(-1,- 1)}
                                onFocus={() => this.props.pos(i, j)}/>;
                // console.log("ref:", i, j, this.inputRef[i][j])
            }
            sheet[i] = <div class="row">{row}</div>;
        }
        // console.log()
        return <div class="sheet">{sheet}</div>;
    }
}

export default Sheet;