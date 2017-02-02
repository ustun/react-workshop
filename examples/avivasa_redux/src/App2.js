import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Foo extends Component {

    componentWillMount() {
	console.log('will mount');

    }

    componentDidMount() {
	console.log('did mount');

    }

    componentDidUpdate() {
	console.log('did update');
    }

    componentWillUnmount() {
	console.log('will unmount');

    }

    render() {
	console.log('rendering');
	return <div>Hello there</div>;
    }

    componentWillReceiveProps() {
	console.log('will receive props');
    }
}

class App extends Component {

    constructor() {
	super()
	this.state = {counter: 10, showCounter: true};

    }

    increment() {
	this.setState({counter: this.state.counter + 1});
    }

    toggleCounter() {
	this.setState({showCounter: !this.state.showCounter});
    }



    render() {
	return (
	    <div className="App">
	      {this.state.showCounter &&<Foo name='foo'/>}

	      <div className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<div>{this.state.counter}</div>
		<button onClick={this.increment.bind(this)}>Increment</button>
		<button onClick={this.toggleCounter.bind(this)}>toggle</button>
		<h2>Hello World</h2>
	      </div>
		      <p className="App-intro">
			    To get started, edit <code>src/App.js</code> and save to reload.
			  </p>
	    </div>
	);
    }
}

export default App;
