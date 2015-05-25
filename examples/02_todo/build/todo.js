
var App = React.createClass({displayName: "App",
  render: function() {
    return (

      React.createElement("section", {id: "todoapp"}, 
        React.createElement("header", {id: "header"}, 
          React.createElement("h1", null, "todos"), 
          React.createElement("input", {id: "new-todo", placeholder: "What needs to be done?", autofocus: true})
        ), 
        React.createElement("section", {id: "main", style: {display: 'block'}}, 
          React.createElement("input", {id: "toggle-all", type: "checkbox"}), 
          React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
          React.createElement("ul", {id: "todo-list"}, React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, "Buy tomatos"), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Buy tomatos"})
            ), React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, "Buy potatoes"), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Buy potatoes"})
            ), React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, "Write the report"), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Write the report"})
            ), React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, "Call Mom"), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Call Mom"})
            ), React.createElement("li", null, 
              React.createElement("div", {className: "view"}, 
                React.createElement("input", {className: "toggle", type: "checkbox"}), 
                React.createElement("label", null, "Have a haircut"), 
                React.createElement("button", {className: "destroy"})
              ), 
              React.createElement("input", {className: "edit", defaultValue: "Have a haircut"})
            ))
        ), 
        React.createElement("footer", {id: "footer", style: {display: 'block'}}, 
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
        )
      )
    );
  }
});


React.render(React.createElement(App, null), document.getElementById('app'));
