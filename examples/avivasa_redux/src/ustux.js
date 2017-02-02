class Store {
    constructor(kararFonksiyonu) {
	this._state = {};
	this.aboneler = [];
	this.mektubaYanitVer = kararFonksiyonu;
    }

    getState() {
	return this._state;
    }

    subscribe(aboneOlmakIsteyen) {
	this.aboneler.push(aboneOlmakIsteyen);
    }

    unsubscribe(aboneliktenCikmakIsteyen) {
	this.aboneler = this.aboneler.filter(abone=>abone!=aboneliktenCikmakIsteyen);
    }

    dispatch(mektup) {
	this._state = this.mektubaYanitVer(this._state, mektup);
	this._abonelereHaberVer();
    }

    // private

    _abonelereHaberVer() {
	this.aboneler.forEach(abone => abone(this._state));
    }

}

function createStore(aFunction) {
    var store = new Store(aFunction);
    return store;
}


// module.exports = createStore;

export default createStore;
