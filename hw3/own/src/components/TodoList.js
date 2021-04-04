import React, {Component} from "react";

class TodoList extends Component {
    render() {
        if (this.props.filter === 1) {
            var todolist = this.props.todolist.filter(item => item.done === false);
            // console.log("active");
        }
        else if (this.props.filter === 2) {
            var todolist = this.props.todolist.filter(item => item.done === true);
            // console.log("complete");
        }
        else {
            var todolist = this.props.todolist;
            // console.log("all");
        }
        todolist = todolist.map((item) => {
            return (
                <TodoItem item={item} markTodoDone={this.props.markTodoDone} removeItem={this.props.removeItem}/>
            );
        });
        return (
            <ul className="todo-app__list" id="todo-list">
                {todolist}
            </ul>
        )
    }
}

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickDone() {
        var key = parseInt(this.props.item.key);
        this.props.markTodoDone(key);
    }
    onClickRemove() {
        var key = parseInt(this.props.item.key);
        this.props.removeItem(key);
    }
    render() {
        var doneClass = this.props.item.done ? "todo-app__item-detail-done" : "todo-app__item-detail-undone";
        var check = this.props.item.done ? true : false;
        return ( 
            <li className="todo-app__item" key={this.props.item.key}>
                <div className="todo-app__checkbox">
                    <input type="checkbox" defaultChecked={check} id={this.props.item.key}  onClick={this.onClickDone} />
                    <label for={this.props.item.key} />
                </div>
                <h1 className={doneClass} >{this.props.item.text}</h1>
                <img src="../img/x.png" className="todo-app__item-x" onClick={this.onClickRemove} />
            </li>
        );
        
    }
}

export default TodoList;