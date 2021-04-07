import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			todoItems: [],
			leftnum: 0,
			mode: "All"
		};
	}

	count_leftnum = () => {
		let count = 0;
		for (const element of this.state.todoItems) {
			if(!element.isFinished) {
				count = count + 1;
			}
		}
		this.setState(state => ({ leftnum: count}));		
	}	

	add_todoItems = (newelement) => {
		this.setState(prevState => ({todoItems: [...prevState.todoItems, newelement]}), () => { 
	    	this.count_leftnum();
		});
	}
	modify_todoItems = (index) => {
	    // 1. Make a shallow copy of the items
	    let todos = [...this.state.todoItems];
	    // 2. Make a shallow copy of the item you want to mutate
	    let todo = {...todos[index]};
	    // 3. Replace the property you're intested in
	    todo.isFinished = !todo.isFinished;
	    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
	    todos[index] = todo;
	    // 5. Set the state to our new copy
	    this.setState(state => ({ todoItems: todos }), () => { 
	    	this.count_leftnum();
		});   
	}
	delete_todoItems = (index) => {
		let todos = [...this.state.todoItems];
		todos.splice(index, 1);
	    this.setState(state => ({ todoItems: todos }), () => { 
	    	this.count_leftnum();
		}); 		
	}
	clear_todoItems = () => {
		this.setState(state => ({ todoItems: state.todoItems.filter(x => !x.isFinished)}));	
	}

	modify_mode = (mode) => {
		this.setState(state => ({ mode: mode}));	
	}

	componentDidUpdate() {
		console.log(this.state.mode);
		console.log(this.state.leftnum);
		console.log(this.state.todoItems);
	}

    render() {
        return (
            <>
                <Header text="todos" />
                <Section todoItems={this.state.todoItems} add_todoItems={this.add_todoItems} modify_todoItems={this.modify_todoItems} delete_todoItems={this.delete_todoItems} mode={this.state.mode}/>
				<Footer todoItems={this.state.todoItems} leftnum={this.state.leftnum} modify_mode={this.modify_mode} clear_todoItems={this.clear_todoItems}/>     
            </>
        );
    }
}

export default TodoApp;
