var HelloWorld = React.createClass({displayName: "HelloWorld",
    render: function () {
    return React.createElement("div", null, "Hello There")
            }

});

React.render(React.createElement(HelloWorld, null), document.getElementById('app'));
