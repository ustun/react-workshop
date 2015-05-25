var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('./AppDispatcher');

var internalState = {counter: 0}

var Store = _.extend(EventEmitter.prototype, {
    incrementCounter: function () {
        internalState.counter++;
    },

    decrementCounter: function () {
        internalState.counter--;
    },

    getState: function () {
        return internalState;

    },
    emitChange: function () {
        this.emit("change");
    },

    addChangeListener: function (callback) {
        this.on("change", callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    },


});


AppDispatcher.register(function (payload) {
     if (payload.actionType === "INCREMENT") {
        Store.incrementCounter();
        Store.emitChange();
     } else if (payload.actionType === "DECREMENT") {
        Store.decrementCounter();
        Store.emitChange();

     }
});


module.exports = Store;
