var HelloWorld = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      null,
      'Hello Sweden'
    );
  }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));

