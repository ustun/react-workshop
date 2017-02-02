
class User {


    constructor(name, surname) {
	this.name = name;
	this.surname = surname;
    }

    sayHello() {
	console.log("hello from " + this.name);

    }


}

user = new User("Ahmet", "Dursun");

user.okul = "TED Ankara";
