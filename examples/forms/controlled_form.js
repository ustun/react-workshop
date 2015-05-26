var MyForm = React.createClass({
    onSubmit: function () {
        console.log("the form values are", this.state.name);

    },
    getInitialState: function () {
        return {name: ''};
    },

    changeName: function (e) {
        this.setState({name: e.target.value});

    },

    render: function () {
        return <form onSubmit={this.onSubmit}>
        <input onChange={this.changeName} value={this.state.name} placeholder="What is your name?"/>
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
        </form>

    }


})


    React.render(<MyForm/>, document.body);
