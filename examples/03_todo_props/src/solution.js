var Header = React.createClass({

    render: function () {
        return <header id="header">
        <h1>todos</h1>
        <input id="new-todo" placeholder="What needs to be done?" autofocus />
        </header>;
    }
});

var Footer = React.createClass({

    setAll: function () {
        this.props.setStatus("all");
    },

    setCompleted: function () {
        this.props.setStatus("completed");
    },
    setActive: function () {
        this.props.setStatus("active");
    },

    render: function () {

        return <footer id="footer" style={{display: 'block'}}>
        <span id="todo-count"><strong>{this.props.numberLeft}</strong> items left</span>
        <ul id="filters">
        <li>
        <a onClick={this.setAll}  className={this.props.status === "all" && "selected"} href="#/">All</a>
        </li>
        <li>
        <a onClick={this.setActive} className={this.props.status === "active" && "selected"} href="#/active">Active</a>
        </li>
        <li>
        <a onClick={this.setCompleted} className={this.props.status === "all" && "completed"} href="#/completed">Completed</a>
        </li>
        </ul>
        </footer>;

    }

});



var TodoItem = React.createClass({

    onClick: function () {
        this.props.toggle(this.props.task.description);
    },

    remove: function () {
        this.props.remove(this.props.task.description);
    },


    render: function () {
        return <li>
        <div className="view">
        <input className="toggle" type="checkbox"
        checked={this.props.task.completed}
        onChange={this.onClick}/>
        <label>{this.props.task.description}</label>
        <button className="destroy" onClick={this.remove}/>
        </div>
        <input className="edit" defaultValue="Buy tomatos" />
        </li>

    }

});


var Todos = React.createClass({

    render: function () {

        return         <section id="main" style={{display: 'block'}}>
        <input id="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>


        <ul id="todo-list">
        {this.props.tasks.map(function (task, i) {
            return <TodoItem task={task}
            key={i}
            toggle={this.props.toggle}
            remove={this.props.remove}/>;
        }.bind(this))}

        </ul>
        </section>;
    }

});


var App = React.createClass({

    getInitialState: function () {
        return {status: "all",
        tasks: [{description:"react sunumu yap", completed: false},
        {description: "buy tomatoes", completed: true},
        {description: "buy potatoes", completed: false},
        ]};

    },

    toggle: function (description) {
        this.state.tasks.forEach(function (task) {
            if (task.description === description) {
                task.completed = !task.completed;
            }
        })

        this.setState({tasks: this.state.tasks});

    },

    remove: function (description) {
        var tasks = this.state.tasks.filter(function (task) {
            return task.description !== description;
        })

        this.setState({tasks: tasks});

    },


    setStatus: function (newStatus) {
        this.setState({status: newStatus});
    },

    render: function() {


        var currentTasks = this.state.tasks.filter(function (task) {
            if (this.state.status === "all") {
                return true;
            }

            if (this.state.status === "active") {
                return !task.completed;
            }

            if (this.state.status === "completed") {
                return task.completed;
            }

        }.bind(this));

        return (
            <section id="todoapp">
            <Header/>
            <Todos
            tasks={currentTasks}
            toggle={this.toggle}
            remove={this.remove}/>


            <Footer
            numberLeft={this.state.tasks.filter(function (task) {
                return !task.completed;
            }).length}
            status={this.state.status}
            setStatus={this.setStatus}/>;


            </section>
            );
    }
});
