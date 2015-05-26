# Integrating React with External Libraries

In this chapter, we will be covering how to integrate React with external libraries such as jQuery or Angular.

## AJAX calls

One common question when learning React is how React does AJAX calls. The short answer is it doesn't. So, say you have an AJAX request via jQuery, for example if you issue a GET request using jQuery, it is up to you how to use the response data in your React components.

Most of the time, one simply uses setState to save the response data in component's state.


As an example, assume we hit the Github API endpoints at this URL: https://github.com/TODO

This returns a list of repos of the given user. Let's first write a React component that will display a list of such repos when the repos array is hard coded.

```js

var Repos = React.createClass({

render: function () {

var renderRepo = function (repo) {
return <div>Repo {repo.name} {repo.date}</div>
}
return <div>
{repos.map(renderRepo)}

</div>

}

});
```

Note that in the map function, we are making use of a helper function. We could instead have used an anonymous function.

Now, let's tweak this component so that we hit the endpoint via AJAX. Instead of hard-coding repos, we will be storing the repos in the state. Initially, the repos will point to an empty array. Once we get the response, we will set the repos field in state to the response data.

```js

var Repos = React.createClass({
getInitialState: function () {
return {repos: []};

},

componentDidMount: function () {
$.get(GITHUB_ENDPOINT, function (data) {
this.setState({repos: data.objects});
}.bind(this));

},
render: function () {

var renderRepo = function (repo) {
return <div>Repo {repo.name} {repo.date}</div>
}
return <div>
{repos.map(renderRepo)}

</div>

}

});
```
