var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({

    render() {
        return <div>Hello Oredev!</div>;
    }
});


ReactDOM.render(<HelloWorld/>, document.getElementById('app'));
