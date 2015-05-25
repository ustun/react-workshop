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

The dispatcher sends this event to all the stores subscribed to it.

Each store gets a copy of a message. It can then decide whether it is interested in a given action.

If interested, it handles the action, updates its internal state, and triggers a "changed" event.

The React components which have subscribed to the stores which have triggered a "changed" event synchronize their state with stores' states. They re-render so that their view is up to date with their state.
