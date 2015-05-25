var HelloWorld = React.createClass({

    render: function () {
        return <div>Hello John</div>;
    }
});

React.render(<HelloWorld/>, document.getElementById('app'));
