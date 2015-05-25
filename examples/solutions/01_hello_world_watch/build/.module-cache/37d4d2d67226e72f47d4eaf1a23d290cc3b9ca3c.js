var HelloWorld = React.createClass({displayName: "HelloWorld",
    render: function () {
    return React.createElement("div", null, "Hello World")
            }

});

React.render(React.createElement(HelloWorld, null), document.getElementById('app'));
