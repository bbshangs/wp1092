import React from 'react';


class Section extends React.Component {
	constructor(props) {
		super(props);
		this.pressEnter = this.pressEnter.bind(this);
		this.pressButton = this.pressButton.bind(this);
		this.pressX = this.pressX.bind(this);
	}	

	pressEnter(event) {
		if(event.key === 'Enter') {
			this.props.add_todoItems({text:event.target.value, isFinished: false});
			event.target.value = '';
		}
	}
	pressButton(index) {
		this.props.modify_todoItems(index);
	}
	pressX(index) {
		this.props.delete_todoItems(index);
	}	


	render() {
		// 目前所在的模式
		let display = this.props.todoItems;
		if(this.props.mode === "All") {
			display = this.props.todoItems;
		}
		else if (this.props.mode === "Active") {
			display = this.props.todoItems.filter(x => !x.isFinished);
		}
		else if (this.props.mode === "Completed") {
			display = this.props.todoItems.filter(x => x.isFinished);
		}		
		// 用map生成內容
		let lists = display.map((currElement, index) => {
			// 以下四行很不優雅，待改進
			let text_status = currElement.isFinished ? "-finished" : null;
			let checkbox_ = currElement.isFinished ? 
			<input type="checkbox" id={index} onClick={()=>this.pressButton(index)} checked></input> 
			: <input type="checkbox" id={index} onClick={()=>this.pressButton(index)}></input>;
			return (				
	    		<li className="todo-app__item">
	    			<div className="todo-app__checkbox">
	    				{checkbox_}
	    				<label htmlFor={index}></label>
	    			</div>
	    			<h1 className={"todo-app__item-detail"+text_status}>{currElement.text}</h1>
	    			<img src="./img/x.png" className="todo-app__item-x" onClick={()=>this.pressX(index)}></img>
	    		</li>            			
			);
		});

	    return (
		    <section className="todo-app__main">
		    	<input className="todo-app__input" placeholder="What needs to be done?" onKeyDown={this.pressEnter}></input>

	  			{this.props.todoItems.length > 0 && (
	  				<ul className="todo-app__list" id="todo-list">
	  					{lists}
	  				</ul>
	  			)}
		    </section>
	    )
	} 
}

export default Section;