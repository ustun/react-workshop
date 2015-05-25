# State Management in React

React's main strength is in handling applications with changing state. For this, React exposes two important methods: getInitialState and setState. There is also replaceState, but that is rarely used. getInitialState provides the initial state of the component, and setState accepts an object which is merged into the current state. ReplaceState on the other hand completely sets a new state without merging with the current state.

Just like props, the state object can be accessed in a render method like an ordinary object.

Let's review the Counter example.

```js
    var Counter = React.createClass({

        getInitialState: function () {
            return {counter: 0};
        },
        increment: function () {
            this.setState({counter: this.state.counter + 1});
        },
        render: function () {
            return <div className="react-component " onClick={this.increment}>
                Counter value is {this.state.counter}
                </div>;

        }

    });
```

We have `onClick` handler that calls `setState` with state incremented by 1. This is the essence of state management with React.

An owner component can pass its state as props to its children. So we might say that one component's state is another's props.
Let's return to the Counters example from the introduction. There, we were collecting the state at the top, owner component. This technique, combined with passing down event handler functions as props to child components is how applications are built with React. Let's analyze:

```js

var Counter = React.createClass({
render: function () {
return <div>Counter value is {this.props.counter}<button onClick={this.props.click}>Increment</button></div>
}

});
var Counters = React.createClass({

getInitialState: function () {
return {counter1: 10, counter2: 0};
},

incrementCounter1: function () {
this.setState({counter1: this.state.counter1 + 1, counter2: this.state.counter2 - 1})
},
incrementCounter2: function () {
this.setState({counter1: this.state.counter1 - 1, counter2: this.state.counter2 + 1})
},

render: function () {
return <div>
<Counter click={this.incrementCounter1} counter={this.state.counter1}/>
<Counter click={this.incrementCounter2} counter={this.state.counter2}/>

</div>

},
})
```

Or using `bind`, we can write it more succintly:
```js
var Counters = React.createClass({

getInitialState: function () {
return {counter1: 10, counter2: 0};
},

incrementCounter: function (increment) {
this.setState({counter1: this.state.counter1 + increment, counter2: this.state.counter2 - increment})
},

render: function () {
return <div>
<Counter click={this.incrementCounter1.bind(this, 1)} counter={this.state.counter1}/>
<Counter click={this.incrementCounter2.bind(this, -1)} counter={this.state.counter2}/>

</div>

},
})
```


In other words, the child components never update their props directly. They inform the parent component that some event has happened, the parent modifies its state and React handles propagating the state as props once more.

Exercise:
