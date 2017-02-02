import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

var initialTodos = [
    {description: 'Domates al', completed: false},
    {description: 'Patates al', completed: false},
    {description: 'Sogan al', completed: true},
    {description: 'Salca al', completed: false},
    {description: 'Ekmek al', completed: false},



]

function TodoReducer(state={todos: initialTodos, newTodo: ""}, action) {


    switch (action.type) {

    case "SET_TEMP_TODO":
	var newState = {todos: state.todos, newTodo: action.value};
	return newState;

    case "ADD_TODO":
	var newTodos = [...state.todos, {description: state.newTodo, completed: false}];
	var newState = {todos: newTodos , newTodo: ''};
	return newState;

    case "TOGGLE_TODO":
	console.log(action);

	var newTodos = state.todos.map(function (todo) {
	    if (todo.description == action.description) {
		return {description: todo.description, completed: !todo.completed};
	    }
	    return todo;
	});


	var newState = {todos: newTodos, newTodo: state.newTodo};

	return newState;


    case "REMOVE_TODO":
	console.log(action);
	var newTodos = state.todos.filter(todo =>  todo.description != action.description);

	var newState = {todos: newTodos, newTodo: state.newTodo};

	return newState;


    default:
	return state;
    }
}

var store = createStore(TodoReducer);

function TodoItem(props) {
    return <li>
	<div className="view">
	<input className="toggle" type="checkbox" checked={props.item.completed} onChange={props.toggle}/>
	<label>{props.item.description}</label>
	<button className="destroy" onClick={props.destroy}>Destroy</button>
	</div>

    </li>;

}


function mapDispatchToPropsItem(dispatch, ownProps) {
    return {
	toggle: function () {
	    dispatch({type: 'TOGGLE_TODO', description: ownProps.item.description});
	},
	destroy: function () {
	    dispatch({type: 'REMOVE_TODO', description: ownProps.item.description});

	}
    };

}

var TodoItemContainer = connect(null, mapDispatchToPropsItem)(TodoItem);

function TodoList(props) {

    return <ul>
	{props.items.map(item=><TodoItemContainer item={item} />)}

    </ul>;

};

function mapStateToProps(state) {
    return {items: state.todos};
}


var TodoListContainer = connect(mapStateToProps)(TodoList);

function TodoHeader(props) {
    return <header id="header">
	<h1>todos</h1>
	<form onSubmit={e=> {e.preventDefault(); props.addTodo();}}>
	<input id="new-todo" value={props.value} onChange={(e)=>props.setValue(e.target.value)} placeholder="What needs to be done?" autoFocus=""/>
	</form>
	</header>
};


function s2pHeader(state) {
    return {value: state.newTodo};
}

function d2pHeader(dispatch) {
    return {
	setValue: function (value) {
	    dispatch({type: 'SET_TEMP_TODO', value: value})

	},
	addTodo: function () {
	    dispatch({type: 'ADD_TODO'});
	}

    }
};

var TodoHeaderContainer = connect(s2pHeader, d2pHeader)(TodoHeader);

class TodoAppContainer extends Component {

	render() {
	    return <section id="todoapp">
		<TodoHeaderContainer/>
		<section id="main" style={{ display: 'block'}}>
		<input id="toggle-all" type="checkbox"/>
		<label htmlFor="toggle-all">Mark all as complete</label>
		<TodoListContainer/>
		</section>
		<footer id="footer" style={{ display: 'block'}}>
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
		</section>;

	}


    }

ReactDOM.render(<Provider store={store}>
		<TodoAppContainer/>
		</Provider>,
		document.getElementById('root')
	       )
