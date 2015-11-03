var React = require('react');
var ReactDOM = require('react-dom');

require('./styles.css');

var MyForm = React.createClass({

    onSubmit: function (e) {
        debugger
        e.preventDefault();
      var name = ReactDOM.findDOMNode(this.refs.name).value;
      // Can also use simply
      // var name = this.refs.name.value;

        var surname = ReactDOM.findDOMNode(this.refs.surname).value;
        var comment = ReactDOM.findDOMNode(this.refs.comment).value;
        var fromSweden = ReactDOM.findDOMNode(this.refs.fromSweden).checked;
        var gender = ReactDOM.findDOMNode(this.refs.gender).value;

        console.log("Form submitted with the following values", name, surname, comment, fromSweden, gender);


    },

    render: function () {

        return <form onSubmit={this.onSubmit}>
        <input ref="name" placeholder="What is your name"/>
        <input ref="surname" placeholder="What is your surname?"/>
        <textarea ref="comment" placeholder="Comment"/>
        <label><input ref="fromSweden" type="checkbox"/>Are you from Sweden?</label>
        <label>Gender:
        <select ref="gender">
        <option>Male</option>
        <option>Female</option>
        </select></label>
        <button type="submit">Submit</button>

        </form>;


    }


});

ReactDOM.render(<MyForm/>, document.getElementById('main'));
