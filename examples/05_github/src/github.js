var React = require('react');
var ReactDOM = require('react-dom');

var ComponentName = React.createClass({

  render() {
    return <div>
      Github Repos
      </div>;

  }

});


ReactDOM.render(<ComponentName/>, document.getElementById('app'));
