# Form Handling with React

In React, there are two approaches to handling forms and form elements: uncontrolled and controlled elements.

## Uncontrolled Components

Using uncontrolled components is discouraged, but sometimes necessary to know, so we will start with this. Here, the values of the elements are not governed by React state. The native DOM elements are the source of truth. One can read the value of a component either from the event object if it needs to read in response to an event, or by directly accessing the DOM element through refs.

Each child component can have a unique ref by which the owner can refer to it. For example, let's say we have the following component: `<div><span ref="inner">This is the inner text</span></div>`. Here we can refer to the inner span using `this.refs.inner`. Refs, just like props and state is an object on the component.

To get to the actual DOM node, we either use React.findDOMNode() which accepts a ref or we use `getDOMNode` method of the ref. It should however be noted that `getDOMNode` is deprecated, and it is recommended to use `findDOMNode`.

Let's have a form with uncontrolled text inputs.
```js
<form onSubmit={this.onSubmit}>

<input ref={name} placeholder="What is your name"/>
<input ref={surname} placeholder="What is your surname?"/>
<button type="submit">Submit</button>

</form>
```
To access the name and surname, we use findDOMNode in the submit function as follows:

```js
var MyForm = React.createClass({

    onSubmit: function (e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value;
        var surname = React
            .findDOMNode(this.refs.surname).value;
        var comment = React
            .findDOMNode(this.refs.comment).value;
        var fromDenmark = React
            .findDOMNode(this.refs.fromDenmark).checked;
        var gender = React.findDOMNode(this.refs.gender).value;

        console.log("Form submitted with the following values",
        name, surname, comment, fromDenmark, gender);


    },

    render: function () {

        return <form onSubmit={this.onSubmit}>
        <input ref="name" placeholder="What is your name"/>
        <input ref="surname"
        placeholder="What is your surname?"/>
        <textarea ref="comment" placeholder="Comment"/>
        <label><input ref="fromDenmark"
        type="checkbox"/>Are you from Denmark?</label>
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

```

Note that for checkboxes, we do not use the `value`, but the `checked` attribute. For textarea, the syntax is different from normal HTML, textarea in JSX is self-closing and children are not allowed, defaultValue must be used to give it an initial value. (More on this in the next section on controlled components)

Also note that we had to prevent the default form submission with `preventDefault`. Here, the `e` argument is an event, however it is not a native DOM event, it is a synthetic event that React provides so that it works consistently across browsers.

## Controlled Components

The idiomatic way to handle forms in React is to bind the values of the inputs to a state field. Each form input accepts either a value or checked attribute, which can refer to a state element.

Additionally, each component exposes an onChange event, where we can react to the incoming value of the input element and update the state accordingly.

Let's see an example:

```js
var MyForm = React.createClass({

getInitialState: function () {
return {name: ''};
},
render: function () {
return <form onSubmit={this.onSubmit}>
 <input value={this.state.name} placeholder="What is your name?"/>
</form>

}


})
```

Try typing into the input component. You actually cannot. React will immediately revert the change since it keeps the sync between state and the input element's value.

So, we need to update the state when the value of the input element changes:

```js
var MyForm = React.createClass({

getInitialState: function () {
return {name: ''};
},
changeName: function (e) {
this.setState({name: e.target.value});
},
render: function () {
return <form onSubmit={this.onSubmit}>
 <input onChange={this.changeName} value={this.state.name} placeholder="What is your name?"/>
</form>

}


})
```

This means our state is updated whenever the name input changes. Let's rewrite our submit method then:

```js
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
</form>

}


})
```

We no longer need to access the form values using ref's, it is already synchronized in our state object.
This is the essence of form handling with React.

## Other Form or Input Events

In addition to `onChange` and `onSubmit`, some other events of note are the following: `onFocus`, `onBlur`.



Exercise:

- Add another form input for credit card where the user can only enter numbers.

Hint: You can use `/^\d+$/.test(foo)` to test whether the variable `foo` consists of only numbers.

- Can you delete the card number after entering a few digits? If not, fix the bug.

- As the user types in the name field, greet them with a gender prefix. The male names are: `["John", "George"]`. The female names are `["Jane", "Mary"]`. If gender cannot be determined from the name, greet with just the name. If there is no name yet, do not greet.

- As the user passes from the name field to the card field, validate the name such that it is at least 3 letters. If the name is 2 letters, show a warning. Note that you should not show the warning initially.

Hint: Think about state variables to keep track of. Should the variable that determines whether the input is valid or not be stored in state? Think about pros and cons.
