import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';


var initialState = {
    todos: [
	{description: 'Domates al', completed: false},
	{description: 'Patates al', completed: false},
	{description: 'Sogan al', completed: true},

    ],

    tempTodo: '',

    activeFilter: 'All'

};


function todoAppReducer(state=initialState, action) {
    var newState, newTodos;

    switch (action.type) {

    case "SET_TEMP_TEXT":
	// action.value = "Ahmet"
	newState = {todos: state.todos, tempTodo: action.value, activeFilter: state.activeFilter};
	return newState;

    case "ADD_TODO":
	newTodos = [{description: state.tempTodo, completed: false}, ...state.todos];

	newState = {...state,
		    todos: newTodos,
		    tempTodo: ''};
	return newState;

    case "REMOVE_TODO":
	// action.description = 'Domates al'

	newTodos = state.todos.filter(todo => todo.description != action.description);

	newState = {...state, todos: newTodos};
	return newState;

    case "TOGGLE_TODO":
	// action.description = 'Domates al'
	newTodos = state.todos.map(function (todo) {
	    if (todo.description == action.description) {
		return {...todo, completed: !todo.completed};
	    } else {
		return todo;
	    }

	});
	newState = {...state, todos: newTodos};
        return newState;
    case "SET_FILTER":
	return state;

    }


}


var store = createStore(todoAppReducer);

store.subscribe(() => console.log(JSON.stringify(store.getState(), null, 4)));

store.dispatch({type: 'SET_TEMP_TEXT', value: 'Vergi ode'});

store.dispatch({type: 'ADD_TODO'});

store.dispatch({type: 'TOGGLE_TODO', description: 'Vergi ode'});


function TodoHeader(props) {

    return <header id="header">
	<h1>todos</h1>
	<form onSubmit={e=> {e.preventDefault(); props.addTodo();}}>
	<input id="new-todo"
    value={props.newTodo}
    onChange={e => props.setNewTodo(e.target.value)}
    placeholder="What needs to be done?" autoFocus=""/>
	</form>
	</header>;
}

function mapStateToProps1(state) {
    return {newTodo: state.tempTodo};
}

function mapDispatchToProps1(dispatch) {
    return {
	setNewTodo: function (value) {
	    dispatch({type: 'SET_TEMP_TEXT', value: value});
	},

	addTodo: function () {
	    debugger
	    dispatch({type: 'ADD_TODO'});
	}
    };
}

var TodoHeaderContainer = connect(mapStateToProps1, mapDispatchToProps1)(TodoHeader);



var TodoItem = function (props) {
    return <li>
	<div className="view">
	<input className="toggle" type="checkbox"/>
	<label>{props.item.description}</label>
	<button className="destroy"></button>
	</div>
	<input className="edit" value="Buy tomatos"/>
	</li>;
};

var TodoList = function (props) {
    return <ul id="todo-list">
	{props.todos.map(todo=><TodoItem item={todo}/>)}
    </ul>;
}

function mapState2Props(state) {
    return {todos: state.todos};
}

var TodoListContainer = connect(mapState2Props)(TodoList);
class TodoApp extends Component {

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


ReactDOM.render(
    <Provider store={store}>
      <TodoApp/>
    </Provider>,
    document.getElementById('root')
)
