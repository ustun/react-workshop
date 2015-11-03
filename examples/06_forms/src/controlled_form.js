var React = require('react');
var ReactDOM = require('react-dom');

var MyForm = React.createClass({
    onSubmit: function () {
        console.log("the form values are", this.state.name);

    },
    getInitialState: function () {
        return {name: '', card: ''};
    },

    changeName: function (e) {
        this.setState({name: e.target.value});

    },

  changeNumber(e) {
    // debugger
    e.preventDefault();
    if (/^\d+$/.test(e.target.value)) {
      this.setState({number: e.target.value});
    }
  },

    changeCard: function (e) {
        if (/^[\d-]*$/.test(e.target.value)) {
            this.setState({card: e.target.value});
        }

    },

    render: function () {
        var gender, inner;

        if (["John", "Adam"].indexOf(this.state.name) > -1) {
            gender = "Male";
        }

        if (["Susan", "Mary"].indexOf(this.state.name) > -1) {
            gender = "Female";
        }

        if (this.state.name.length >= 3) {
            inner = <span>Hello {this.state.name} {gender} </span>;
        }

        return <form onSubmit={this.onSubmit}>
        <input onChange={this.changeName} value={this.state.name} placeholder="What is your name?"/>
  <input onChange={this.changeCard} value={this.state.card} placeholder="What is your card?"/>

          <input onChange={this.changeNumber} value={this.state.number} placeholder="Number input?"/>


       {inner}
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
  </form>;

    }


})


ReactDOM.render(<MyForm/>, document.getElementById('main'));
