
var Github = React.createClass({displayName: "Github",

    getInitialState: function () {
        return {'data': []};

    },
    componentDidMount: function () {
        $.getJSON("https://api.github.com/users/ustun/repos", function (data) {
            this.setState({data: data});
        }.bind(this));
    },
    render: function () {
        var renderRepo = function (repo) {
            return React.createElement("div", null, React.createElement("a", {href: repo.html_url, target: "_blank"}, "Repo name is ", repo.name));
        };
        return React.createElement("div", {className: "react-component "}, 
        this.state.data.map(renderRepo)
        );

    }

});


React.render(React.createElement(Github, null), document.getElementById('app'));
