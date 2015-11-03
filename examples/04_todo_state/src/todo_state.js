var React = require('react');
var ReactDOM = require('react-dom');


var TodoInput = React.createClass({

  onSubmit(event) {
    event.preventDefault();
    var valueOfInput = this.refs.inputBox.value;
    this.props.addTask(valueOfInput);
    this.refs.inputBox.value = '';
  },

  render() {
    return <header id="header">
    <h1>todos</h1>
    <form onSubmit={this.onSubmit}>
    <input id="new-todo" ref='inputBox' placeholder="What needs to be done?" autofocus />
    </form>
    </header>;

  }
});


var TodoItem = React.createClass({

  render() {
    return <li>
    <div className="view">
    <input className="toggle" type="checkbox" checked={this.props.task.completed} onClick={this.props.toggleTaskCompleted.bind(null, this.props.task.description)}/>
    <label>{this.props.task.description}</label>
    <button className="destroy" onClick={this.props.deleteTaskCompleted.bind(null, this.props.task.description)}/>
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
        return <TodoItem task={task} key={task.description} toggleTaskCompleted={this.props.toggleTaskCompleted}

        deleteTaskCompleted={this.props.deleteTaskCompleted}/>;
      }.bind(this))}

      </ul>
      </section>);

  }

});


var TodoFooter = React.createClass({

  render() {
    return         <footer id="footer" style={{display: 'block'}}>
    <span id="todo-count"><strong>{this.props.nLeft}</strong> items left</span>
    <ul id="filters">
    <li>
    <a className={this.props.currentFilter === 'All' ? 'selected': ''} href="#/" onClick={this.props.setCurrentFilter.bind(null, "All")}>All</a>
    </li>
    <li>
    <a className={this.props.currentFilter === 'Active' ? 'selected': ''} href="#/active" onClick={this.props.setCurrentFilter.bind(null, "Active")}>Active</a>
    </li>
    <li>
    <a className={this.props.currentFilter === 'Completed' ? 'selected': ''} href="#/completed" onClick={this.props.setCurrentFilter.bind(null, "Completed")}>Completed</a>
    </li>
    </ul>
    </footer>;

  }

});


var App = React.createClass({

  setCurrentFilter(filterName) {
    this.setState({currentFilter: filterName});
  },

  getInitialState() {
    return {
      currentFilter: "All",
      tasks: [{description: "111buy this", completed: false},
              {description: "do this", completed: true},
              {description: "do that", completed: false},
              {description: "shave", completed: false}]};
  },

  toggleTaskCompleted(description) {
    // find the task with the description and toggle its completed state
    var tasks = this.state.tasks;

    tasks.forEach(function (task) {
      if (task.description === description) {
        task.completed = !task.completed;
      }
    });

    this.setState({tasks: tasks});
  },

  deleteTaskCompleted(description) {
    // find the task with the description and delete it
    var tasks = this.state.tasks.filter((task) => task.description !== description);
    this.setState({tasks: tasks});
  },

  addTask(description) {
    var tasks = this.state.tasks;
    tasks.push({description: description, completed: false});
    this.setState({tasks: tasks});
  },


  render() {

    var nLeft = this.state.tasks.filter(function (task) {
      return !task.completed;
    }).length;


    var filterFn = function (task) {
      if (this.state.currentFilter === 'All') {
        return true;
      }

      if (this.state.currentFilter === 'Active') {
        return !task.completed;
      }

      if (this.state.currentFilter === 'Completed') {
        return task.completed;
      }
    }.bind(this);

    var tasksForCriteria = this.state.tasks.filter(filterFn);

    console.log("nLeft", nLeft);

    return <section id="todoapp">
    <TodoInput addTask={this.addTask}/>
    <TodoList tasks={tasksForCriteria} toggleTaskCompleted={this.toggleTaskCompleted} deleteTaskCompleted={this.deleteTaskCompleted}/>
    <TodoFooter currentFilter={this.state.currentFilter} nLeft={nLeft} setCurrentFilter={this.setCurrentFilter}/>
    </section>;

  }

});


ReactDOM.render(<App/>, document.getElementById('app'));
