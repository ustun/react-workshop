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

	var TopMenu = React.createClass({

	  getInitialState: function getInitialState() {

	    return { items: ["About", "Work", "Contact", "Jobs", "Mission", "History"] };
	  },

	  onClick: function onClick() {
	    var items = this.state.items;
	    items.push("Blog");
	    this.setState({ items: items });
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "ul",
	        { className: "button-group" },
	        this.state.items.map(function (menuItem) {
	          return React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { href: "http://foundation.zurb.com/templates/portfolio-theme.html#", className: "button" },
	              menuItem
	            )
	          );
	        })
	      ),
	      React.createElement(
	        "button",
	        { onClick: this.onClick },
	        "Click me"
	      )
	    );
	  }

	});

	var Top = React.createClass({
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "row" },
	        React.createElement(
	          "div",
	          { className: "small-12 medium-4 large-6 columns namelogo" },
	          React.createElement(
	            "h1",
	            null,
	            "Name/Logo/Brand"
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "small-12 medium-8 large-6 columns" },
	          React.createElement(
	            "div",
	            { className: "nav-bar" },
	            React.createElement(TopMenu, null)
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "hero" },
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "large-12 columns intro-text" },
	            React.createElement(
	              "p",
	              null,
	              "Merhaba!",
	              React.createElement("br", null),
	              "I take outdoor pictures."
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "row about" },
	        React.createElement(
	          "div",
	          { className: "medium-6 large-8 columns" },
	          React.createElement(
	            "h4",
	            null,
	            "About"
	          ),
	          React.createElement(
	            "p",
	            null,
	            "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef."
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "medium-6 large-4 columns" },
	          React.createElement("img", { src: "./mockup_files/portfolio5.png" })
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "row work" },
	        React.createElement("hr", null),
	        React.createElement(
	          "div",
	          { className: "large-12 columns" },
	          React.createElement(
	            "h4",
	            null,
	            "Work"
	          ),
	          React.createElement(
	            "p",
	            null,
	            "Click on each image to view my work!"
	          ),
	          React.createElement(
	            "ul",
	            { className: "clearing-thumbs small-block-grid-1 medium-block-grid-2 large-block-grid-4", "data-clearing": true },
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "./mockup_files/portfolio1.jpg" },
	                React.createElement("img", { "data-caption": "caption here", src: "./mockup_files/portfolio1.jpg" })
	              )
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "./mockup_files/portfolio2.jpg" },
	                React.createElement("img", { "data-caption": "caption 2 here...", src: "./mockup_files/portfolio2.jpg" })
	              )
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "./mockup_files/portfolio3.jpg" },
	                React.createElement("img", { "data-caption": "caption 3 here...", src: "./mockup_files/portfolio3.jpg" })
	              )
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "./mockup_files/portfolio4.jpg" },
	                React.createElement("img", { "data-caption": "caption 4 here...", src: "./mockup_files/portfolio4.jpg" })
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "row contact" },
	        React.createElement("hr", null),
	        React.createElement(
	          "div",
	          { className: "large-12 columns" },
	          React.createElement(
	            "h4",
	            null,
	            "Contact Me"
	          ),
	          React.createElement(
	            "div",
	            { className: "large-4 columns" },
	            React.createElement(
	              "strong",
	              null,
	              "Email"
	            ),
	            ": ",
	            React.createElement(
	              "a",
	              { href: "http://foundation.zurb.com/templates/portfolio-theme.html#" },
	              "me@myportfolio.com"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "large-4 columns" },
	            React.createElement(
	              "strong",
	              null,
	              "Twitter"
	            ),
	            ": @twitterhandle"
	          ),
	          React.createElement(
	            "div",
	            { className: "large-4 columns" },
	            React.createElement(
	              "strong",
	              null,
	              "Phone"
	            ),
	            ": 555-555-1234"
	          )
	        )
	      )
	    );
	  }
	});

	var Footer = React.createClass({
	  render: function render() {
	    return React.createElement(
	      "footer",
	      { className: "row" },
	      React.createElement(
	        "div",
	        { className: "large-12 columns" },
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "large-6 columns" },
	            React.createElement(
	              "p",
	              null,
	              "© Copyright no one at all. Go to town."
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "large-6 columns" },
	            React.createElement(
	              "ul",
	              { className: "inline-list right" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "http://foundation.zurb.com/templates/portfolio-theme.html#" },
	                  "FAQ"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "http://foundation.zurb.com/templates/portfolio-theme.html#" },
	                  "Privacy"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "http://foundation.zurb.com/templates/portfolio-theme.html#" },
	                  "Suscribe"
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(Top, null), document.getElementById('main'));
	ReactDOM.render(React.createElement(Footer, null), document.getElementById('footer'));

/***/ }
/******/ ]);