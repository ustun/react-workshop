# Flux

Flux is a library open sourced by Facebook last year. Actually, Flux is rather not a library, but a technique for handling complex applications, applications where the React model of handling state internally inside components does not work very well.

## When is Flux a good idea?

It is not obvious when to use Flux as opposed to just React. It takes time, experience, and even then depends on the taste of the developer.

Usually, the requirements of using Flux can be summarized as following:

1. We know that it is a good idea to manage state as high as possible in React hierarchy. However, if the levels are too deep, the props will need to be passed from the top level to the inner most levels. If a refactoring causes another layer to be introduced, props have to be passed from that layer once more.

2. If two components do not have the same root in the DOM, yet want to synchronize state, just using React will not suffice. A canonical example is the Facebook chat application, where the chat message counter at the bottom right has to be synchronized with the counter at the top right. Here, the application state has to be managed at an object outside both React components, and each component should subscribe to the changes in that object.

## Stores

In Flux terminology, that object is called a store. A store acts as an event emitter, so that whenever it changes, it emits a "changed" event. Interested React components simply subscribe to this event, and then use `setState` whenever the store changes.

A component can subscribe to multiple stores, in which case, it can merge the information coming from stores in its state object.

## Just Stores: an MVC like Approach

What triggers changes to stores? Can React components directly change stores by executing methods in the stores? This is definitely possible, especially in small scale applications. So, the flow is as follows: The component subscribes to the store such that its state is synchronized with the store. When an event happens on the component, the component informs the store that something should change. Store acts internally, then updates its internal state and informs the component.

This is very similar to an MVC architecture where the store acts as the model. The view, which is the React component renders itself as the store updates itself. React component also acts as the controller as it intercepts the events, and forwards them to the store.

## Actions

As applications get more complex, developers at Facebook decided to decouple the actions triggered by components from the stores. That is, in some complex applications, the React component should not be directly calling the store methods. Instead, React components generate actions.

These actions pass through a dispatcher. Stores do not subscribe to actions, but to dispatcher. The advantage is that a dispatcher can send a single action to multiple stores.

When the actions are forwarded from the dispatcher to the store, the store can determine which actions to respond to. It does this via registering some callbacks to certain actions and acting accordingly.

So, the flow in a Flux application becomes the following:

React components initialize themselves, and get their state from the stores. They also subscribe to store changes.

When an event happens in a React component, they intercept the event, create an action via the dispatcher.

The dispatcher broadcast the event, i.e. it sends this event to all the stores subscribed to it.

Each store gets a copy of a message. It can then decide whether it is interested in a given action.

If interested, it handles the action, updates its internal state, and triggers a "changed" event.

The React components which have subscribed to the stores which have triggered a "changed" event synchronize their state with stores' states. They re-render so that their view is up to date with their state.

## Summary of Flux

A component deep down in the hiearchy can generate actions. This is the main advantage of Flux over React. With Flux, event handlers are rarely passed as props. In a way, Flux goes sideways (laterally) while React goes top to bottom.

Advantages of Flux can be listed as follows:

- Since stores are independent of views, they can more easily be tested.
- The views become simpler and dumber.
- Adding multiple levels of hiearchy does not cause significant refactorings.


There are disadvantages of Flux too. First, complexity increases as the number of parts increases. Second, it might be hard to make fine grained subscriptions to stores, so any small change could cause a re-render from the top of the hiearchy. Finally, as the stores are essentially singletons, it might become problematic if another version of the store is needed in the same application. In an MVC application, one can have more than one model, but with stores, this is not straightforward.

## Getting Started with Flux

First install the Flux module. This only provides the Dispatcher, as that is the only part we are not concerned with writing.
```
npm intall flux
```

Then, we initialize an app dispatcher using this Dispatcher module and export
it as the sole output of this module named AppDispatcher.


```js
var AppDispatcher = new Dispatcher();
module.exports = AppDispatcher;
```

Then, we need an `actions.js` where we trigger events on the
dispatcher. Define a few actions that triggers the dispatch method in the
appdispatcher. The argument to the `dispatch` method is called the payload. It
can be any object, but it is recommended that it has at least an `actionType`
key.

```js
var AppDispatcher = require('./AppDispatcher');

var increment = function () {
    AppDispatcher.dispatch({actionType: 'increment', data: "foo"})
}

var decrement = function () {
    AppDispatcher.dispatch({actionType: 'decrement', data: "bar"})
}
```

Then, export these actions so that they can be called from React components.

```js
module.exports = {increment, decrement};
```

Now, we can bind these actions to our event handlers in our React component:

```js
var Actions = require('./Actions');
var MyView = React.createClass({


render: function () {
return <div>
<div onClick={Actions.action1}>Trigger action1</div>
<div onClick={Actions.action1}>Trigger action2</div>

</div>

}
})
```

Next, we will create our store.  Assume that the store has an internal state
that has a counter value.  Also define a helper method that increments or
decrements the counter value.  Note that these are completely view independent
and can be tested accordingly. Finally, define a `getState` function that can
be exported so that our views can subscribe to this store. `getState` is the
only method that should be called from the views, all the other methods will
be triggered internally via actions.

```js
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var internalState = {counter: 0}

var Store = _.extend({}, EventEmitter.prototype, {
    incrementCounter: function () {
                      internalState.counter++;
                      },

decrementCounter: function () {
    internalState.counter++;
},

getState: function () {
    return internalState;

},
emitChange: function () {
            this.emit("change");
},

    addChangeListener: function (callback) {
        this.on("change", callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    },
});

module.exports = Store;
```

Additionally, note that since the store will be emitting a change event, we
extend the EventEmitter prototype with our custom methods. In addition to
domain methods like decrementCounter, incrementCounter, we also provide adding
and removing change listeners, which our views can use to subscribe to changes
when they are mounted.

Next, we need to register our stores with the dispatcher so that it can
respond to the actions broadcast from the dispatcher.  Require the dispatcher,
and then register the events.

```js
var AppDispatcher = require('./AppDispatcher');

AppDispatcher.register(function (payload) {
     if (payload.actionType === "INCREMENT") {
        Store.incrementCounter();
        Store.emitChange();
     } else if (payload.actionType === "DECREMENT") {
        Store.decrementCounter();
        Store.emitChange();

     }
});
```

Finally, we will make sure that our React components get their initial state
from the store, and subscribe to changes in the store.

```js
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

}
})
```
