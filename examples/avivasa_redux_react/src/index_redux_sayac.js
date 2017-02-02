import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';


function sayacReducer(state={sayac: 0}, action) {

    if (action.type == "ARTIR") {
        return {sayac: state.sayac + 1};
    }

    if (action.type == "AZALT") {
	if (state.sayac > 0) {
            return {sayac: state.sayac - 1};
	}
    }

    return state;

}

var store = createStore(sayacReducer);

store.subscribe(function() {
    console.log("Abone1", store.getState());
    console.log("Merhaba", store.getState());
});

store.dispatch({type: 'AZALT'});
store.dispatch({type: 'ARTIR'});






function stateToProps(state) {
    // Input: {sayac: 15, isim: 'Ahmet'}
    // Output: {sayac: 15, isim: 'Ahmet'}
    return {sayac: state.sayac, isim: state.isim};
}

function dispatchToProps(dispatch) {
    return {
	artir: function () {
	    dispatch({type: 'ARTIR'});
	},
	azalt: function () {
	    dispatch({type: 'AZALT'});
	}
    };

}




class App extends Component {

    render() {
	return <div>Sayacin degeri {this.props.sayac}
	    <button onClick={this.props.artir}>Artir </button>
	    <button onClick={this.props.azalt}>Azalt </button>

	</div>;
    }
}

var AppContainer = connect(stateToProps, dispatchToProps)(App);


class ContainerComponent extends Component {
    constructor() {
	super();
	this.state = store.getState();
    }

    componentDidMount() {
	store.subscribe(() => this.setState(store.getState()));
    }

}


class AppContainer extends ContainerComponent {

    artir() {
	store.dispatch({type: 'ARTIR'});
    }

    azalt() {
	store.dispatch({type: 'AZALT'});
    }

    render () {
	return <App sayac={this.state.sayac} artir={this.artir} azalt={this.azalt}/>;
    }
}

ReactDOM.render(
    <Provider store={store}>
      <AppContainer/>
    </Provider>,
    document.getElementById('root'));
