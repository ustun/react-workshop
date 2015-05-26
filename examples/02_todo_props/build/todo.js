
var TodoHeader = React.createClass({displayName: "TodoHeader",

    render: function () {
        return (
            React.createElement("header", {id: "header"}, 
          React.createElement("h1", null, "todos"), 
          React.createElement("input", {id: "new-todo", placeholder: "What needs to be done?", autofocus: true})
        ));


    }

});


var TodoFooter = React.createClass({displayName: "TodoFooter",

    render: function () {
        return React.createElement("footer", {id: "footer", style: {display: 'block'}}, 
          React.createElement("span", {id: "todo-count"}, React.createElement("strong", null, "5"), " items left"), 
          React.createElement("ul", {id: "filters"}, 
            React.createElement("li", null, 
              React.createElement("a", {className: "selected", href: "#/"}, "All")
            ), 
            React.createElement("li", null, 
              React.createElement("a", {href: "#/active"}, "Active")
            ), 
            React.createElement("li", null, 
              React.createElement("a", {href: "#/completed"}, "Completed")
            )
          )
        );
    }

});


var Todo = React.createClass({displayName: "Todo",

    render: function () {
        return React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, this.props.task), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Buy tomatos"})
            );
    }

});



var Todos = React.createClass({displayName: "Todos",

    render: function () {
        var tasks = ["do this", "do that", "buy tickets"];

        return (
        React.createElement("section", {id: "main", style: {display: 'block'}}, 
          React.createElement("input", {id: "toggle-all", type: "checkbox"}), 
          React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
            React.createElement("ul", {id: "todo-list"}, 
            tasks.slice().sort().map(function (task) {
                return React.createElement(Todo, {task: task});
            })
            ), 
            tasks.map(function (task) {
                return React.createElement("div", null, task);
            })
        ));

    }

});


var App = React.createClass({displayName: "App",
  render: function() {
    return (
        React.createElement("section", {id: "todoapp"}, 
        React.createElement(TodoHeader, null), 
        React.createElement(Todos, null), 
        React.createElement(TodoFooter, null)
      )
    );
  }
});


React.render(React.createElement(App, null), document.getElementById('app'))
