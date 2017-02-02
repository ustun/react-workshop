import React from 'react';
import ReactDOM from 'react-dom';
import App, {} from './App';
import './index.css';
import createStore from './ustux';

function CounterReducer(state, mektup) {
    if (mektup.type == 'INIT') {
	state.count = 1000;
    }

    if (mektup.type == 'ARTIR') {
	state.count = state.count + 1;
    }

    if (mektup.type == 'AZALT') {
	state.count = state.count - 1;
    }


    return state;

}

var counterStore = createStore(CounterReducer);


function Counter(props) {

    return <div>
	Sayac son durum {props.count}
	<button onClick={()=> counterStore.dispatch({type: 'ARTIR'})}>Artir </button>
	<button onClick={()=> counterStore.dispatch({type: 'AZALT'})}>Azalt </button>
	</div>
}

var abone = function (state) {
    // {count: 100}
    // {count: 100}

    ReactDOM.render(
	<Counter count={state.count}/>,
	document.getElementById('root')
    );

}

var abone2 = function (state) {
    console.log(state);

}


counterStore.subscribe(abone);
counterStore.subscribe(abone2);


counterStore.dispatch({type: 'INIT'});
