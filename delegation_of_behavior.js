// ---OO-(Object Oriented) -style---------
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function () {
    return 'I am ' + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function () {
    console.log('Hello, ' + this.identify() + '.');
};

var b1 = new Bar('b1');
var b2 = new Bar('b2');

b1.speak();
b2.speak();

// ---OLOO-(Object Linked to Other Objects)--
var Foo1 = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return 'I am ' + this.me;
    },
};

var Bar1 = Object.create(Foo1);

Bar1.speak = function () {
    console.log('Hello, ' + this.identify() + '.');
};

var c1 = Object.create(Bar1);
c1.init('c1');
var c2 = Object.create(Bar1);
c2.init('c2');

c1.speak();
c2.speak();

// ------------------------------------------
var LoginController = {
    errors: [],
    getUser: function () {
        return document.getElementById('login_username').value;
    },
    getPassword: function () {
        return document.getElementById('login_password').value;
    },
    validateEntry: function (user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();

        if (!(user && pw)) {
            return this.failure('Please enter a username & password!');
        } else if (pw.length < 5) {
            return this.failure('Password must be 5+ characters!');
        }

        // Управление передано сюда? Проверка прошла успешно!
        return true;
    },
    showDialog: function (title, msg) {
        // вывести сообщение для пользователя в диалоговом окне
    },
    failure: function (err) {
        this.errors.push(err);
        this.showDialog('Error', 'Login invalid: ' + err);
    },
};

// Связывание 'AuthController' для делегирования 'LoginController'
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function () {
    var user = this.getUser();
    var pw = this.getPassword();
    if (this.validateEntry(user, pw)) {
        this.server('/check-auth', {
            user: user,
            pw: pw,
        })
            .then(this.accepted.bind(this))
            .fail(this.rejected.bind(this));
    }
};
AuthController.server = function (url, data) {
    return $.ajax({
        url: url,
        data: data,
    });
};
AuthController.accepted = function () {
    this.showDialog('Success', 'Authenticated!');
};
AuthController.rejected = function (err) {
    this.failure('Auth Failed: ' + err);
};

// если понадобится создать один или несколько
// дополнительных объектов, это делается просто
var controller1 = Object.create(AuthController);
var controller2 = Object.create(AuthController);

// ---problem with class----------------
// ---example-1---
class C {
    constructor() {
        this.num = Math.random();
    }
    rand() {
        console.log('Random: ' + this.num);
    }
}

var c1 = new C();
c1.rand(); // 0.23418423524524

C.prototype.rand = function () {
    console.log('Random: ' + Math.round(this.num * 1000));
};

var c2 = new C();
c2.rand(); // 560

c1.rand(); // 234

// -2-1 if you need save the common state ---
class C1 {
    // необходимо изменить общее состояние, а не
    // задать замещенное свойство в экземплярах!
    constructor() {
        C1.prototype.count++;

        // здесь 'this.count' в работает так, как
        // и ожидалось, благодаря делегированию!
        console.log('Hello: ' + this.count);
    }
}

C1.prototype.count = 0;

var a1 = new C1(); // Hello: 1

var a2 = new C1(); // Hello: 2

console.log(a2.count); // 2
console.log(a1.count); // 2

// -2-2 but,
class C2 {
    constructor(id) {
        // ловушка - метод 'id()' замещается
        // значением свойства экземпляра
        this.id = id;
    }
    id() {
        console.log('Id: ' + id);
    }
}

var b1 = new C2('b1');
// c1.id();
// TypeError: c1.id is not a function

// ---example-3---
class P {
    foo() {
        console.log('P.foo');
    }
}

class C3 extends P {
    constructor() {
        super();
    }
}

var c3 = new C3();
c3.foo(); // P.foo

var D = {
    foo: function () {
        console.log('D.foo');
    },
};

var E = {
    foo: C3.prototype.foo,
};

// connect E with D for delegation
Object.setPrototypeOf(E, D);

D.foo(); // D.foo
E.foo(); // P.foo
