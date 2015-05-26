# Props in React

In this section, we introduce props, short for properties. Each component in React, whether a native component like div, p or a custom component we create like HelloWorld can take an object of properties. In JSX syntax, this object is passed as key-value attributes delimited by equals sign.


For example, if we want to pass the object `{name: "Ustun"}` as props to `HelloWorld`, we write the following: `<HelloWorld name="Ustun"/>`

Props object can be accessed in the render method and in other lifecycle methods from this.props. Similarly, the name key in props can be accessed as this.props.name.

Let's give a sample example with props:

```js
var HelloWorld = React.createClass({

    render: function () {
        return <div>{"Hello " + this.props.name}</div>;
    }
});
```

## A More Complex Example

Let's extend the HelloWorld application so that we greet a bunch of people. The list of people is given as `["John", "Mary", "Susan"]`. Let's use this array to build a list of nodes where each person is greeted.

```js
var People = React.createClass({

    render: function () {
         var people = ["John", "Mary", "Susan"];
         var peopleNodes = [];

         for (var i = 0; i < people.length; i++) {
             peopleNodes.push(<HelloWorld name={people[i]}/>);
         }
         return <div>{peopleNodes}</div>;
    }

});
```

Let's write this in a more idiomatic way, using `map` instead of a for loop.


```js
var People = React.createClass({

    render: function () {
         var people = ["John", "Mary", "Susan"];

         var peopleNodes = people.map(function (person) {
return <HelloWorld name={person}/>;
 });

         return <div>{peopleNodes}</div>;
    }

});
```

Since the map operation is an expression, we even do not need the intermediate variable called peopleNodes. We can directly embed the map inside the JSX expression in the return statement.


```js
var People = React.createClass({

    render: function () {
         var people = ["John", "Mary", "Susan"];

            return <div>{people.map(function (person) { return <HelloWorld name={person}/>; })}</div>;
    }

});
```

Again, this may or may not make reading the code harder.

## Events and Functions as Props

Any JavaScript expression can be passed down as props. It does not have to be simple variables like integers or strings. Since functions in JavaScript are first class values, we can pass functions as props.

Similarly, event handling in React is just down by props whose key values are named accordingly, for example, onClick, onBlur etc.

First, let's attach an onclick handler to a div element. Again note that we can access the props inside the event handler through `this.props`.

```js
var HelloWorld = React.createClass({


    onClick: function () {
    console.log("Hello " + this.props.name);
},
    render: function () {
        return <div onClick={this.onClick}>{"Hello " + this.props.name}</div>;
    }
});
```

Let's return back to the people list and assume that this onClick handler actually lives in the People component, not HelloWorld. We want to pass each HelloWorld component a click handler which it can call when it is clicked. Why do we do that? It depends on the situation. Sometimes it is better if the logic is concentrated in a single root component. This way, the children become dumb and easier to comprehend.

We modify HelloWorld as follows, this time, when it is clicked, it simply executes whatever was passed from the parent. This is also useful for testing, we can simply swap other onClick handlers when using the child component.


```js
var HelloWorld = React.createClass({

    render: function () {
        return <div onClick={this.props.onClick}>{"Hello " + this.props.name}</div>;
    }
});
```

The complexity is now concentrated in the parent component. We modify the People component as follows:


```js
var People = React.createClass({

    onClick: function (name) {
    console.log("Hello " + name);
},


    render: function () {
         var people = ["John", "Mary", "Susan"];

         return <div>{people.map(function (person) {
            return <HelloWorld onClick={this.onClick.bind(this, person)} name={person}/>; }.bind(this))}</div>;
         }

});
```

This is a bit harder to comprehend. Let's dissect it further. First of all, we
modified the onClick handler so that it accepts a name argument. This way, it
can be used with different names. Second, we are passing an onClick handler to
each HelloWorld, but that onClick handler needs to be customized for each
HelloWorld, according to the person name. So, first, we generalized the
onClick function by adding an argument name, then we specialized it using the
`bind` method, that is created partially applied functions customized for each
person.

Also note the second bind where we bind `this` of the function we are mapping
with to the component itself. We could have instead done the following: Pass
this as a second parameter to map or use another variable name like `that` at
the outer scope and refer to it.

## Bind method

Here we will give a brief overview of the `bind` method. In JavaScript, the word `this` is not a variable, but a keyword. As such, its meaning can change depending on the situation. The method bind has two purposes: Bind the this of a function so that the function becomes bound. So wherever that function is called, the meaning of this does not change.

The second purpose of bind is to pass any additional parameters to a function, creating a partially applied function. For example,
let's say we have a function called add that adds two values.

```js
function add(a, b) { return a + b; }
```

Using add, we want to create another function that adds 5 to its single parameter, that is we want to fix a to 5. Here, the value of this does not matter since we are not referring to it in the body of the function, so in place of the first paramter, we can pass any value, for example null.

Note that bind does not call the function, it simply creates another function where the value of this and some other paramters are fixed (bound).

```js
var add5 = add.bind(null, 5)
console.log(add5(3)); // 8
```

Exercise:

Think about how you can rename the method `console.log` to `l`. Does a simple `var l = console.log` work correctly? What is the correct solution?

Let's return back to the previous example and see the two usages of bind there. First, we look at the last bind. This ensures that the this inside the mapper function is still the component.

The second bind is more complex, this ensures that whatever is passed downstream as a function has a fixed `this` context and furthermore, the first parameter to the function is fixed to the current person name.

To write it verbosely, we could have done the following:

```js
var People = React.createClass({

    onClick: function (name) {
    console.log("Hello " + name);
},


    render: function () {
         var people = ["John", "Mary", "Susan"];

return <div>{people.map(function (person) {
var boundFunction = this.onClick.bind(this, person);
            return <HelloWorld onClick={boundFunction} name={person}/>; }.bind(this))}</div>;
         }

});
```

Another alternative to using bind is to save a copy of the current this value to another variable like that. If we do that, the second bind is no longer necessary. we still need the first bind however, to make sure that we are binding the first name parameter.


```js
var People = React.createClass({

    onClick: function (name) {
    console.log("Hello " + name);
},


    render: function () {
         var people = ["John", "Mary", "Susan"];
         var that = this;
         return <div>{people.map(function (person) {
            return <HelloWorld onClick={that.onClick.bind(that, person)} name={person}/>; })}</div>;
            }

});
```

Yet another alternative is to use underscore's partial function. The intent is more explicit if we use _.partial. Here we do not pass

```js
var People = React.createClass({

    onClick: function (name) {
    console.log("Hello " + name);
},


    render: function () {
         var people = ["John", "Mary", "Susan"];
         var that = this;
         return <div>{people.map(function (person) {
            return <HelloWorld onClick={_.partial(that.onClick, person)} name={person}/>; })}</div>;
            }

});
```

## getDefaultProps

In addition to `render`, React supports a number of component methods. getDefaultProps is one of them and as its name suggests, you can return default property values from this method. For example, let's say that in our greeting, we want to greet by "Hello" by default, but if a greeting is provided as a prop, we want to use that instead.

We change HelloWorld as follows:

```js
var HelloWorld = React.createClass({
getDefaultProps: function () {return {greeting: 'Hello'}},
render: function () {
return <div>{this.props.greeting} {this.props.name}</div>;
}

});


var People = React.createClass({
render: function () {

return <div>
<HelloWorld name="John"/>
<HelloWorld greeting="Hola" name="Mary"/>


</div>

});

The output is
```
Hello John
Hola Mary
```
