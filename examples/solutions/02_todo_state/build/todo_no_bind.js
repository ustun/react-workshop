
var Todo = React.createClass({displayName: "Todo",

    toggleItemWithName: function (val) {
        this.props.toggleItemWithName(val);
    },

    removeItemWithName: function (val) {
        this.props.removeItemWithName(val);
    },

    render: function () {
        return React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
        React.createElement("input", {className: "toggle", type: "checkbox", checked: this.props.item.completed, 
        onChange: this.toggleItemWithName.bind(this, this.props.item.name)}), 
                React.createElement("label", null, this.props.item.name), 
                React.createElement("button", {className: "destroy", onClick: this.removeItemWithName.bind(this, this.props.item.name)})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Buy tomatos"})
            );

    }

});

var Todos = React.createClass({displayName: "Todos",

    render: function () {
        return      React.createElement("ul", {id: "todo-list"}, 
        this.props.items.map(function (item) {
            return React.createElement(Todo, {item: item, toggleItemWithName: this.props.toggleItemWithName, removeItemWithName: this.props.removeItemWithName});
        }.bind(this))
        );
    }

});


var Footer = React.createClass({displayName: "Footer",

    setCriteria: function (val) {
        this.props.setCriteria(val)
    },

    render: function () {
        return React.createElement("footer", {id: "footer", style: {display: 'block'}}, 
          React.createElement("span", {id: "todo-count"}, React.createElement("strong", null, this.props.nLeft), " items left"), 
          React.createElement("ul", {id: "filters"}, 
            React.createElement("li", null, 
              React.createElement("a", {className: !this.props.criteria && "selected", href: "#/", onClick: this.setCriteria.bind(this, null)}, "All")
            ), 
            React.createElement("li", null, 
              React.createElement("a", {className: this.props.criteria === "active" && "selected", href: "#/active", onClick: this.setCriteria.bind(this, "active")}, "Active")
            ), 
            React.createElement("li", null, 
              React.createElement("a", {className: this.props.criteria === "completed" && "selected", href: "#/completed", onClick: this.setCriteria.bind(this, "completed")}, "Completed")
            )
          )
        )
    }

});


var App = React.createClass({displayName: "App",

    getInitialState: function () {
        return {items: [{name: "Do this", completed: true},
                        {name: "Do that", completed: false},
                        {name: "Buy this", completed: false},
                        {name: "Buy that", completed: false},
                        {name: "go to shopping", completed: true}],
        criteria: null};
    },

    setCriteria: function (criteria) {
        this.setState({criteria: criteria});

    },

    toggleItemWithName: function (name) {
        this.state.items.forEach(function (item) {
            if (item.name === name) {
                item.completed = !item.completed;
            }
        });

        this.setState({items: this.state.items});

    },

    removeItemWithName: function (name) {
        var items = this.state.items.filter(function (item) {
            return item.name !== name;
        });

        this.setState({items: items});

    },


    render: function() {

        var items = this.state.items.slice().sort().reverse();
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

      React.createElement("section", {id: "todoapp"}, 
        React.createElement("header", {id: "header"}, 
          React.createElement("h1", null, "todos"), 
          React.createElement("input", {id: "new-todo", placeholder: "What needs to be done?", autofocus: true})
        ), 
        React.createElement("section", {id: "main", style: {display: 'block'}}, 
          React.createElement("input", {id: "toggle-all", type: "checkbox"}), 
          React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
        React.createElement(Todos, {items: items, toggleItemWithName: this.toggleItemWithName, 
        removeItemWithName: this.removeItemWithName})
        ), 

        React.createElement(Footer, {setCriteria: this.setCriteria, criteria: this.state.criteria, nLeft: this.state.items.filter(function (item) { return !item.completed}).length})
      )
    );
  }
});


React.render(React.createElement(App, null), document.getElementById('app'));
