var React = require('react');
var ReactDOM = require('react-dom');

var Top = React.createClass({
  render: function() {
    return <div>mockup</div>;
  }
});


var Footer = React.createClass({
  render: function() {
    return null;
  }
});



ReactDOM.render(<Top/>, document.getElementById('main'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));
