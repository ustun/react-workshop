var FILTER_NAME = "copenhagen"
var CLIENT_ID = "8ed8f14f61b24c95ad54583110ace715"
var ENDPOINT = `https://api.instagram.com/v1/tags/${FILTER_NAME}/media/recent?client_id=${CLIENT_ID}`
var Instagram = React.createClass({displayName: "Instagram",


    getInitialState: function () {
        return {'photos': [], nextUrl: null};

    },

    componentDidMount: function () {
        $.getJSON(ENDPOINT, function (response) {
            if (this.isMounted()) {
                this.setState({photos: response.data, nextUrl: response.pagination.next_url})
            }
        }.bind(this));
    },

    loadMore: function () {
        $.getJSON(this.state.nextUrl, function (response) {
            var photos = this.state.photos;
            photos = photos.concat(response.data)
                if (this.isMounted()) {
                    this.setState({photos: photos, nextUrl: response.pagination.next_url})
                }
        }.bind(this));

    },
    render: function () {
        var renderPhoto = function (photo) {
            return React.createElement("div", null, 
            React.createElement("a", {href: photo.images.standard_resolution.url, target: "_blank"}, React.createElement("img", {src: photo.images.thumbnail.url})), 
            photo.caption.text
            )
        };
        return React.createElement("div", {className: "react-component "}, 
        this.state.photos.map(renderPhoto), 

        this.state.nextUrl && React.createElement("button", {type: "button", onClick: this.loadMore}, "Load More")
        );

    }

});


React.render(React.createElement(Instagram, null), document.getElementById('app'));
