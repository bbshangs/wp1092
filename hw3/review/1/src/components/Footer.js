import React from 'react';


class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.pressModeButton = this.pressModeButton.bind(this);
		this.pressClearButton = this.pressClearButton.bind(this);
	}

	pressModeButton(mode) {
		this.props.modify_mode(mode);
	}
	pressClearButton() {
		this.props.clear_todoItems();
	}	

	render() {
	    return (
	    	<>
				{this.props.todoItems.length > 0 && (
					<footer className="todo-app__footer" id="todo-footer">
						<div className="todo-app__total">{this.props.leftnum.toString()+" left"}</div>
						<ul className="todo-app__view-buttons">
							<button onClick={()=>this.pressModeButton("All")}>All</button>
							<button onClick={()=>this.pressModeButton("Active")}>Active</button>
							<button onClick={()=>this.pressModeButton("Completed")}>Completed</button>
						</ul>

			  			{(this.props.todoItems.length-this.props.leftnum) !== 0 && (
			  				<div className="todo-app__clean" onClick={()=>this.pressClearButton()}>Clear completed</div>
			  			)}
			  			{(this.props.todoItems.length-this.props.leftnum) === 0 && (
			  				<div/>
			  			)}
					</footer>   
				)}
			</> 
	    )
	}
}

export default Footer;