"use strict"

class Police {
    constructor (name, baslangicTarihi) {
	this.name = name;
	this.baslangicTarihi = baslangicTarihi;
    }

}



class Store {
    constructor (mektupOlusturmaFonksiyonu) {
	this._mektupOlustur = mektupOlusturmaFonksiyonu;
	this._state = {};
	this._aboneler = [];
    }

    subscribe(abone) {
	this._aboneler.push(abone);
    }

    unsubscribe(cikmakIsteyenAbone) {
	this._aboneler = this._aboneler.filter(abone => abone != cikmakIsteyenAbone);
    }

    dispatch(mektup) {
	this._mektubaYanitVer(mektup);
	this._abonelereHaberVer();
    }

    getState() {
	return this._state;
    }

    // sonrasi private
    _abonelereHaberVer() {
	for (var i = 0; i < this._aboneler.length; i++) {
	    var abone = this._aboneler[i];
	    abone(this._state);
	}

    }
    _mektubaYanitVer(mektup) {
	var yanit = this._mektupOlustur(this._state, mektup);
	this._state = yanit;
    }

}

var createStore = function (birFonksiyon) {
    return new Store(birFonksiyon);
}

function combineReducers(...args) {

    return function (oldState, mektup) {
	var newState = oldState;

	for (var i = 0; i < args.length; i++) {
	    var reducer = args[i];
	    newState[reducer.name] = reducer(oldState[reducer.name], mektup);
	}

	return newState;

    };

}



function kullaniciReducer(oldState, mektup) {
    var newState = oldState;

    if (mektup.type == 'INIT') {
	newState.name = mektup.payload.name;
	newState.surname = mektup.payload.surname;
    }

    if (mektup.type == 'SET_NAME' && mektup.payload.id == oldState.userId) {
	newState.name = mektup.payload.value;
    }

    if (mektup.type == 'SET_SURNAME') {
	newState.surname = mektup.payload.value;
    }

    if (mektup.type == 'POLICE_OLUSTUR') {
	newState.policer.push(mektup.policeAdi);

    }
    return newState;
}

function policeReducer(oldState, mektup) {
    var newState = oldState;

    if (mektup.type == "INIT") {
	newState.police = "Police yok";
    }
    if (mektup.type == 'POLICE_OLUSTUR') {
	newState.police = mektup.payload.police;
	    }
    return newState;
}


function anaReducer(oldState, mektup) {


    var newState = oldState;
    // {'type': 'SET_NAME', payload: {'name': 'Ustun', 'id': 1}}
    // {'type': 'SET_NAME', payload: {'name': 'Ustun', 'id': 2}}
    newState['user1'] = userReducer(oldState['user1'], mektup);
    newState['user2'] = userReducer(oldState['user2'], mektup);



}




var anaReducer = combineReducers(kullaniciReducer, policeReducer);

var store = createStore(kullaniciReducer);


function kendiniTanit(state) {
    return state.name + " " + state.surname;
}


store.dispatch({type: 'INIT', payload: {name: 'Ahmet', surname: 'Ozturk'}});


console.log(kendiniTanit(store.getState()));


store.dispatch({type: 'SET_NAME', payload: {value: "Burak"}});

//console.log(k.kendiniTanit());


function ekrandaGoster(sonDurum) {
    console.log("Ekranda goster React ile", sonDurum);

}


var abone1 = function (sonDurum) { ekrandaGoster(sonDurum) }

store.subscribe(abone1) ;

store.subscribe(function (sonDurum) {  console.log(sonDurum)});

store.dispatch({type: 'SET_NAME', payload: {value: "Ali"}});


store.unsubscribe(abone1);

store.dispatch({type: 'SET_NAME', payload: {value: 'Cuneyt'}});
store.dispatch({type: 'SET_SURNAME', payload: {value: 'Caliskan'}});


console.log(store.getState());
