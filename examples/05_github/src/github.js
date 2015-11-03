var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');

require('./styles.less');
var Github = React.createClass({

    getInitialState: function () {
      return {'data': [], filterText: '', username: 'ustun'};

    },

  handleChange(e)  {


    this.setState({filterText: e.target.value});

  },

  handleUserChange(e) {
    this.setState({username: e.target.value}, function () {
      this.getData(this.state.username);
    }.bind(this));
  },

  getData(username) {
    $.getJSON(`https://api.github.com/users/${username}/repos`, function (data) {
            if (this.isMounted()) {
                this.setState({data: data});
            }
        }.bind(this));
  },

    componentDidMount: function () {
      this.getData(this.state.username);
    },
    render: function () {
        var renderRepo = function (repo) {
            return <div><a href={repo.html_url} target="_blank">Repo name is {repo.name}</a></div>;
        };

      var filteredData = this.state.data.filter(function (repo) {
        return repo.name.indexOf(this.state.filterText) > -1;
                                               }, this);

      return <div className="react-component ">
        <input value={this.state.username} onChange={this.handleUserChange}/>

        <input value={this.state.filterText} onChange={this.handleChange}/>
        {filteredData.map(renderRepo)}
        </div>;

    }

});


ReactDOM.render(<Github/>, document.getElementById('app'));
