
var Github = React.createClass({

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
            return <div><a href={repo.html_url} target="_blank">Repo name is {repo.name}</a></div>;
        };
        return <div className="react-component ">
        {this.state.data.map(renderRepo)}
        </div>;

    }

});


React.render(<Github/>, document.getElementById('app'));
