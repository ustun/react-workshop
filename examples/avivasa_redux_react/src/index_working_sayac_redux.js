import React from 'react';
import ReactDOM from 'react-dom';
import App, {} from './App';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';


function counterReducer(state={count: 0}, action) {

    switch (action.type) {

    case "ARTIR":
	return {count: state.count + 1};

    case "AZALT":
	if (state.count > 0) {
	    return {count: state.count - 1};
	} else {
	    return state;
	}
    default:
	return state;
    }

}

var counterStore = createStore(counterReducer);

counterStore.subscribe(function () {
    console.log(counterStore.getState());});



// counterStore.dispatch({type: 'AZALT'});

var Counter = function (props) {
    return <div>
	Sayac: {props.count}
	<button onClick={props.artir}>+</button>
	<button onClick={props.azalt}>-</button>

    </div>;
};

function mapStateToProps(state) {
    return {count: state.count};
}

function mapDispatchToProps(dispatch) {
    return {
	artir: function () {
	    dispatch({type: 'ARTIR'});
	},
	azalt: function () {
	    dispatch({type: 'AZALT'});
	}
    };
}

var CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);


ReactDOM.render(<Provider store={counterStore}>
		<CounterContainer/>

		</Provider>, document.getElementById('root'));
