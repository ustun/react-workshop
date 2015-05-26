var
var Todo = React.createClass({

    render: function () {
        return <li>
        <div className="view">
        <input className="toggle" type="checkbox" checked={this.props.item.completed}
        onChange={this.props.toggleItemWithName.bind(this, this.props.item.name)}/>
        <label>{this.props.item.name}</label>
        <button className="destroy" onClick={this.props.removeItemWithName.bind(this, this.props.item.name)}/>
        </div>
        <input className="edit" defaultValue="Buy tomatos" />
        </li>;

    }

});

var Todos = React.createClass({

    render: function () {
        return      <ul id="todo-list">
        {this.props.items.map(function (item) {
            return <Todo item={item} toggleItemWithName={this.props.toggleItemWithName} removeItemWithName={this.props.removeItemWithName}/>;
        }.bind(this))}
        </ul>;
    }

});


var Footer = React.createClass({

    render: function () {
        return <footer id="footer" style={{display: 'block'}}>
        <span id="todo-count"><strong>{this.props.nLeft}</strong> items left</span>
        <ul id="filters">
        <li>
        <a className={!this.props.criteria && "selected"} href="#/" onClick={this.props.setCriteria.bind(this, null)}>All</a>
        </li>
        <li>
        <a className={this.props.criteria === "active" && "selected"} href="#/active" onClick={this.props.setCriteria.bind(this, "active")}>Active</a>
        </li>
        <li>
        <a className={this.props.criteria === "completed" && "selected"}  href="#/completed" onClick={this.props.setCriteria.bind(this, "completed")}>Completed</a>
        </li>
        </ul>
        </footer>
    }

});


var App = React.createClass({

    getInitialState: function () {
        return {items: Immutable.fromJS([{name: "Do this", completed: true},
                                         {name: "Do that", completed: false},
                                         {name: "Buy this", completed: false},
                                         {name: "Buy that", completed: false},
                                         {name: "go to shopping", completed: true}]),
                criteria: null};
    },

    setCriteria: function (criteria) {
        this.setState({criteria: criteria});

    },

    toggleItemWithName: function (name) {
        var items = this.state.items.map(function (item) {
            if (item.name === name) {
                return {completed:  !item.completed, name: item.name};
            } else {
                return item;
            }
        });

        this.setState({items: items});

    },

    removeItemWithName: function (name) {
        var items = this.state.items.filter(function (item) {
            return item.name !== name;
        });

        this.setState({items: items});

    },


    render: function() {

        var items = this.state.items.toJS().reverse();
        var criteria = this.state.criteria;

        if (criteria) {
            items = items.filter(function (item) {
                if (criteria === "completed") {
                    return item.completed;
                } else {
                    return !item.completed;
                }

            });
        }

        return (

            <section id="todoapp">
            <header id="header">
            <h1>todos</h1>
            <input id="new-todo" placeholder="What needs to be done?" autofocus />
            </header>
            <section id="main" style={{display: 'block'}}>
            <input id="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <Todos items={items} toggleItemWithName={this.toggleItemWithName}
            removeItemWithName={this.removeItemWithName}/>
            </section>

            <Footer setCriteria={this.setCriteria} criteria={this.state.criteria} nLeft={this.state.items.filter(function (item) { return !item.completed}).length}/>
            </section>
        );
    }
});


React.render(<App/>, document.getElementById('app'));
