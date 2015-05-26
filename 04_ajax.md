# Integrating React with AJAX calls

In this chapter, we will be covering how to integrate React with AJAX calls, initiated via jQuery.

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
this.setState({repos: data});
}.bind(this));

},
render: function () {

var renderRepo = function (repo) {
return <div>Repo {repo.name} {repo.created_at}</div>
}
return <div>
{repos.map(renderRepo)}

</div>

}

});
```

Exercise:

Instagram has an API at https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=CLIENT_ID where nofilter is the name of the tag.
- For the workshop, you can use CLIENT_ID=8ed8f14f61b24c95ad54583110ace715 or you can register your own Instagram app at https://instagram.com/developer/
- Implement an Instagram client that shows the photos tagged as HDR.
- The API returns a limited subset of responses, but has a next parameter. Add a "Load More" button at the bottom that loads more items from the API.
- Unlike Github, Instagram API has a cross site security restriction (same origin policy). To overcome this, for this exercise, open Google chrome with web security disabled. "

- On OS X: Open -a Google\ Chrome --args --disable-web-security"
- On Windows: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security
