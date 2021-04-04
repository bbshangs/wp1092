import React, {Component} from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.filterAll = this.filterAll.bind(this);
        this.filterActive = this.filterActive.bind(this);
        this.filterCompleted = this.filterCompleted.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }
    filterAll() {
        this.props.filterList(0);
    }
    filterActive() {
        this.props.filterList(1);
    }
    filterCompleted() {
        this.props.filterList(2);
    }
    clearCompleted() {
        this.props.clearCompleted();
    }

    render() {
        var todoUndone = this.props.todolist.filter(item => item.done === false);
        var todolistLength = this.props.todolist.length;
        var todoUndoneLength = todoUndone.length;
        if (todolistLength === 0) {
            return (null);
        }
        else {
            return (
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{todoUndoneLength} left</div>
                    <ul className="todo-app__view-buttons">
                        <button onClick={this.filterAll}>All</button>
                        <button onClick={this.filterActive}>Active</button>
                        <button onClick={this.filterCompleted}>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button onClick={this.clearCompleted}>Clear completed</button>
                    </div>
                </footer>
            );
        }
    }
}

export default Footer;