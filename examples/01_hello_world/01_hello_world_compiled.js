var HelloWorld = React.createClass({
    render: function () {
        return React.createElement(
            'div',
            null,
            'Hello Oredev'
        );
    }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));

