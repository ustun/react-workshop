/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8090/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var Header = React.createClass({

	    render: function render() {
	        return React.createElement(
	            "header",
	            { id: "header" },
	            React.createElement(
	                "h1",
	                null,
	                "todos"
	            ),
	            React.createElement("input", { id: "new-todo", placeholder: "What needs to be done?", autofocus: true })
	        );
	    }
	});

	var Footer = React.createClass({

	    setAll: function setAll() {
	        this.props.setStatus("all");
	    },

	    setCompleted: function setCompleted() {
	        this.props.setStatus("completed");
	    },
	    setActive: function setActive() {
	        this.props.setStatus("active");
	    },

	    render: function render() {

	        return React.createElement(
	            "footer",
	            { id: "footer", style: { display: 'block' } },
	            React.createElement(
	                "span",
	                { id: "todo-count" },
	                React.createElement(
	                    "strong",
	                    null,
	                    this.props.numberLeft
	                ),
	                " items left"
	            ),
	            React.createElement(
	                "ul",
	                { id: "filters" },
	                React.createElement(
	                    "li",
	                    null,
	                    React.createElement(
	                        "a",
	                        { onClick: this.setAll, className: this.props.status === "all" && "selected", href: "#/" },
	                        "All"
	                    )
	                ),
	                React.createElement(
	                    "li",
	                    null,
	                    React.createElement(
	                        "a",
	                        { onClick: this.setActive, className: this.props.status === "active" && "selected", href: "#/active" },
	                        "Active"
	                    )
	                ),
	                React.createElement(
	                    "li",
	                    null,
	                    React.createElement(
	                        "a",
	                        { onClick: this.setCompleted, className: this.props.status === "all" && "completed", href: "#/completed" },
	                        "Completed"
	                    )
	                )
	            )
	        );
	    }

	});

	var TodoItem = React.createClass({

	    onClick: function onClick() {
	        this.props.toggle(this.props.task.description);
	    },

	    remove: function remove() {
	        this.props.remove(this.props.task.description);
	    },

	    render: function render() {
	        return React.createElement(
	            "li",
	            null,
	            React.createElement(
	                "div",
	                { className: "view" },
	                React.createElement("input", { className: "toggle", type: "checkbox",
	                    checked: this.props.task.completed,
	                    onChange: this.onClick }),
	                React.createElement(
	                    "label",
	                    null,
	                    this.props.task.description
	                ),
	                React.createElement("button", { className: "destroy", onClick: this.remove })
	            ),
	            React.createElement("input", { className: "edit", defaultValue: "Buy tomatos" })
	        );
	    }

	});

	var Todos = React.createClass({

	    render: function render() {

	        return React.createElement(
	            "section",
	            { id: "main", style: { display: 'block' } },
	            React.createElement("input", { id: "toggle-all", type: "checkbox" }),
	            React.createElement(
	                "label",
	                { htmlFor: "toggle-all" },
	                "Mark all as complete"
	            ),
	            React.createElement(
	                "ul",
	                { id: "todo-list" },
	                this.props.tasks.map((function (task, i) {
	                    return React.createElement(TodoItem, { task: task,
	                        key: i,
	                        toggle: this.props.toggle,
	                        remove: this.props.remove });
	                }).bind(this))
	            )
	        );
	    }

	});

	var App = React.createClass({

	    getInitialState: function getInitialState() {
	        return { status: "all",
	            tasks: [{ description: "react sunumu yap", completed: false }, { description: "buy tomatoes", completed: true }, { description: "buy potatoes", completed: false }] };
	    },

	    toggle: function toggle(description) {
	        this.state.tasks.forEach(function (task) {
	            if (task.description === description) {
	                task.completed = !task.completed;
	            }
	        });

	        this.setState({ tasks: this.state.tasks });
	    },

	    remove: function remove(description) {
	        var tasks = this.state.tasks.filter(function (task) {
	            return task.description !== description;
	        });

	        this.setState({ tasks: tasks });
	    },

	    setStatus: function setStatus(newStatus) {
	        this.setState({ status: newStatus });
	    },

	    render: function render() {

	        var currentTasks = this.state.tasks.filter((function (task) {
	            if (this.state.status === "all") {
	                return true;
	            }

	            if (this.state.status === "active") {
	                return !task.completed;
	            }

	            if (this.state.status === "completed") {
	                return task.completed;
	            }
	        }).bind(this));

	        return React.createElement(
	            "section",
	            { id: "todoapp" },
	            React.createElement(Header, null),
	            React.createElement(Todos, {
	                tasks: currentTasks,
	                toggle: this.toggle,
	                remove: this.remove }),
	            React.createElement(Footer, {
	                numberLeft: this.state.tasks.filter(function (task) {
	                    return !task.completed;
	                }).length,
	                status: this.state.status,
	                setStatus: this.setStatus }),
	            ";"
	        );
	    }
	});

	React.render(React.createElement(App, null), document.getElementById('app'));

/***/ }
/******/ ]);