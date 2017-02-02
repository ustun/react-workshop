import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function InputBox () {

    return <header id="header">
	<h1>todos</h1>
	<input id="new-todo" placeholder="What needs to be done?" autoFocus=""/>
	</header>;

}

function TodoFooter() {

    return <footer id="footer" style={{display: 'block'}}>
	<span id="todo-count"><strong>5</strong> items left</span>
	<ul id="filters">
	<li>
	<a className="selected" href="#/">All</a>
	</li>
	<li>
	<a href="#/active">Active</a>
	</li>
	<li>
	<a href="#/completed">Completed</a>
	</li>
	</ul>

    </footer>
}

function TodoItem (props) {

    return <li>
	<div className="view">
	<input className="toggle" type="checkbox"
    checked={props.item.completed}
    onChange={function () { props.onChange(props.item.description)}}/>
	<label>{props.item.description}</label>
	<button className="destroy"></button>
	</div>
	<input className="edit" value={props.item.description}/>
	</li>;
	     }

    function TodoList (props) {

	return <ul id="todo-list">
	    {props.items.map(function (item) {
		return <TodoItem item={item} onChange={props.onChange}/>;
	    })}
	</ul>

    }


    export default class TodoApp extends Component {


	constructor() {
	    super();

	    this.state = {items: [
		{description: 'Buy tomatos', completed: true},
		{description: 'Buy potatos', completed: true},
		{description: 'Buy onions', completed: false},
		{description: 'Wash the car', completed: false},
	    ]};
	}

	toggleItem(description) {
	    // retrieve
	    var currentItems = this.state.items;
	    var newItems = [];
	    // transform

	    for (var i = 0; i < currentItems.length; i++) {
		var item = currentItems[i];

		if (item.description == description) {
		    item.completed = !item.completed;
		}

		newItems.push(item);
	    }


	    // setState

	    this.setState({items: newItems});

	}



	render() {

	    return (
		<section id="todoapp">
		  <InputBox/>
		  <section id="main" style={ {display: 'block'} }>
		    <input id="toggle-all" type="checkbox"/>
		    <label htmlFor="toggle-all">Mark all as complete</label>
		    <TodoList items={this.state.items} onChange={this.toggleItem}/>

		  </section>
		  <TodoFooter/>
		</section>);

	}
    }
