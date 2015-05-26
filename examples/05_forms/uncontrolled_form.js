var MyForm = React.createClass({

    onSubmit: function (e) {
        debugger
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value;
        var surname = React.findDOMNode(this.refs.surname).value;
        var comment = React.findDOMNode(this.refs.comment).value;
        var fromDenmark = React.findDOMNode(this.refs.fromDenmark).checked;
        var gender = React.findDOMNode(this.refs.gender).value;

        console.log("Form submitted with the following values", name, surname, comment, fromDenmark, gender);


    },

    render: function () {

        return <form onSubmit={this.onSubmit}>
        <input ref="name" placeholder="What is your name"/>
        <input ref="surname" placeholder="What is your surname?"/>
        <textarea ref="comment" placeholder="Comment"/>
        <label><input ref="fromDenmark" type="checkbox"/>Are you from Denmark?</label>
        <label>Gender:
        <select ref="gender">
        <option>Male</option>
        <option>Female</option>
        </select></label>
        <button type="submit">Submit</button>

        </form>


    }


});

React.render(<MyForm/>, document.body);
