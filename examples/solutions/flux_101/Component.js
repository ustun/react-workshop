var Actions = require('./Actions');
var Store = require('./Store');

var MyView = React.createClass({

    getInitialState: function () {
        return Store.getState();
    },

    componentDidMount: function () {
        Store.addChangeListener(function () {
            this.setState(Store.getState());
        }.bind(this));

    },




    render: function () {
        return <div>
        Counter value is: {this.state.counter}
        <div onClick={Actions.increment}>Increment</div>
        <div onClick={Actions.decrement}>Decrement</div>
        </div>

    }
});

React.render(<MyView/>, document.getElementById('app'));
