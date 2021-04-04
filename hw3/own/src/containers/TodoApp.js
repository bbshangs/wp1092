import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todolist: [],
            filter: 0
        };
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.filterList = this.filterList.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    addItem(e) {
        // console.log(this._inputElement.value);
        if (this._inputElement.value !== "") {
            console.log("not empty!");
            var newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                done: false
            };
            this.setState((state) => ({
                todolist: state.todolist.concat(newItem)
            }));
            this._inputElement.value = "";
        }
        e.preventDefault();
    }
    removeItem(key) {
        var curTodoList = this.state.todolist.filter(item => {
            return (item.key !== key);
        });
        this.setState((state) => ({
            todolist: curTodoList
        }));
    }
    markTodoDone(key) {
        this.setState((state) => ({
            todolist: this.state.todolist.map(item => {
                if (item.key === key) {
                    return {...item, done: !item.done}
                }
                return item;
            }),
        }));
    }

    filterList(f) {
        this.setState((state) => ({
            filter: f
        }));
        console.log(this.state.filter)
    }

    clearCompleted() {
        var curTodoList = this.state.todolist.filter(item => {
            return (item.done === false);
        });
        this.setState((state) => ({
            todolist: curTodoList
        }));
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <form onSubmit={this.addItem}>
                        <input className="todo-app__input" placeholder="What needs to be done?" ref={(a) => this._inputElement = a} />
                    </form>
                    <TodoList todolist={this.state.todolist} filter={this.state.filter} markTodoDone={this.markTodoDone} removeItem={this.removeItem} />
                </section>
                <Footer todolist={this.state.todolist} filterList={this.filterList} clearCompleted={this.clearCompleted}/>
            </>
        );
    }
}

export default TodoApp;


