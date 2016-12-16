var React = require('react');
var ReactDOM = require('react-dom');


var TodoInput = React.createClass({

  render() {
    return <header id="header">
          <h1>todos</h1>
          <input id="new-todo" placeholder="test What needs to be done?" autofocus />
      </header>;

  }
});

var TodoInput2 = function (data) {
  return <header id="header">
    <h1>todos</h1>
    {data.name}
    <input id="new-todo" placeholder="What needs to be done?" autofocus />
          </header>;

};


var TodoItem = React.createClass({

  render() {
    return <li>
              <div className="view">
                <input className="toggle" type="checkbox" />
      <label>{this.props.task}</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Buy tomatos" />
      </li>;


  }

});



var TodoList = React.createClass({
  displayName: 'TodoList',
  render() {
    return (
        <section id="main" style={{display: 'block'}}>
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">

        {this.props.tasks.map(function (task) {
          return <TodoItem task={task}/>;
        })}

        </ul>
        </section>);

  }

});


var TodoFooter = React.createClass({

  render() {
    return         <footer id="footer" style={{display: 'block'}}>
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
      </footer>;

  }

});


var App = React.createClass({

  render() {
    var todos = ["buy this", "do this", "do that", "shave", "shop"];
    return <section id="todoapp">
      <TodoInput name='ustun'/>
      <TodoList tasks={todos}/>
      <TodoFooter/>
      </section>;

  }

});


ReactDOM.render(<App/>, document.getElementById('app'));
