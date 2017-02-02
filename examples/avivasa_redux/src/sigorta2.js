// import createStore from './ustux';

var createStore = require('./ustux');

function PoliceFonksiyonu(state, mektup) {

    if (mektup.type == 'POLICE_UZATIMI') {
	state.sonTarihi = mektup.bitisTarihi;
    }

    if (mektup.type == 'INIT') {
	state.name = mektup.name;
	state.baslangicTarihi = mektup.baslangicTarihi;
	state.sonTarihi = mektup.sonTarihi;

    }

    return state;

}

var state = {name: 'BES', baslangicTarihi: '2011', sonTarihi: '2018'};

PoliceFonksiyonu(state, {type: 'POLICE_UZATIMI', bitisTarihi: '2023'});



function setSurname(x) {
    var y = 'b';
    return x.toUpperCase() + y;
}


function UserReducer (state, mektup) {

    if (mektup.type == 'INIT') {
	state.name = mektup.name;
	state.surname = mektup.surname;
    }

    if (mektup.type == 'SET_NAME') {
	state.name = mektup.name;
    }

    if (mektup.type = 'SET_SURNAME') {

	state.surname = setSurname(mektup.surname);


    }



    return state;

}

y = 'c';

var assert = require('assert');

var x = UserReducer({}, {type: 'INIT', name: 'Ahmet', surname: 'Ozgur'});

assert(x.name == "Ahmet");

var store = createStore(UserReducer);

var police1 = createStore(PoliceFonksiyonu);



police1.subscribe({haberAl: function (dergi) { console.log("Police abonesi", dergi) }});
police1.subscribe({haberAl: function (dergi) { console.log("Police abonesi2", dergi) }});

police1.dispatch({type: 'INIT', name: 'BES', baslangicTarihi: '2011', sonTarihi: '2018'});
//police1._policeUzat("2026");
police1.dispatch({type: 'POLICE_UZATIMI', bitisTarihi: '2022'});

class Abone {

    haberAl(dergi) {
	throw "haberal abstract"
    }
}

class GoruntuAbonesi extends Abone {

    haberAl(dergi) {

	console.log("react kullanarak dergiyi goster", dergi);
    }
}


console.log(setSurname('a'))

var user = createStore(UserReducer);

user.dispatch({type: 'INIT', name: 'Ahmet', surname: 'Dursun'});

var abone1 = new GoruntuAbonesi();
var abone2 = new GoruntuAbonesi();

var abone3 = {
    haberAl: function (dergi) {
	console.log("Ben sinifi olmayan bir aboneyim", dergi)
    }

}

user.subscribe(abone1);
user.subscribe(abone2);
user.subscribe(abone3);
