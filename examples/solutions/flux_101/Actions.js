var AppDispatcher = require('./AppDispatcher');

var increment = function () {
    AppDispatcher.dispatch({actionType: 'INCREMENT', data: "foo"})
}

var decrement = function () {
    AppDispatcher.dispatch({actionType: 'DECREMENT', data: "bar"})
}

module.exports = {increment, decrement};
