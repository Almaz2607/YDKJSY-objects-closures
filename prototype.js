// -1-prototype------------------------------------
var anotherObject = {
    a: 3,
};

// create an object related to 'anotherObject'
var myObject = Object.create(anotherObject);

for (var key in myObject) {
    console.log('found: ' + key);
}
// found: a
console.log('a' in myObject); // true

// -2-shadowing - (замещение) --------------------
var anotherObject2 = {
    b: 8,
};

var myObject2 = Object.create(anotherObject2);

console.log(anotherObject2.b); // 8
console.log(myObject2.b); // 8

console.log(anotherObject2.hasOwnProperty('b')); // true
console.log(myObject2.hasOwnProperty('b')); // false

myObject2.b++;

console.log(anotherObject2.b); // 8
console.log(myObject2.b); // 9

console.log(myObject2.hasOwnProperty('b')); // true

// -3-class-functions----------------------------
// -example-1-----------------------
function Foo() {
    // ..
}

console.log(Foo.prototype); // {}

var objA = new Foo();

console.log(Object.getPrototypeOf(objA) === Foo.prototype); // true

// -example-2------------------------
function Foo2() {
    // ...
}

console.log(Foo2.prototype.constructor === Foo2); //true

var objB = new Foo2();

console.log(objB.constructor === Foo2); // true

// -4-mechanics-(механика)------------------------
function Foo4(name) {
    this.name = name;
}

Foo4.prototype.myName = function () {
    return this.name;
};

var c = new Foo4('Kyle');
var d = new Foo4('Almaz');

console.log(c.myName()); // Kyle
console.log(d.myName()); // Almaz

// -4-1- about '.constructor' in prototype---------
function Foo41() {}

// create a new object prototype
Foo41.prototype = {};

console.log(Foo41.prototype.constructor === Foo41); // false
console.log(Foo41.prototype.constructor === Object); // true

// -4-2- add the property .constructor manually-----
function Foo42() {}

Foo42.prototype = {}; // create a new object

// необходито 'исправить' отсутствующее свойство '.constructor'
// нового объекта, заменяющего 'Foo42.prototype'.
Object.defineProperty(Foo42.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: Foo42, // property .constructor points to Foo42
});

console.log(Foo42.prototype.constructor === Foo42); // true

// -5-prototypes based inheritance-------------
function Foo5(name) {
    this.name = name;
}

Foo5.prototype.myName = function () {
    return this.name;
};

function Bar(name, label) {
    Foo5.call(this, name);
    this.label = label;
}

// Здесь мы создаем новый объект Bar.prototype,
// связанный с Foo5.prototype
Bar.prototype = Object.create(Foo5.prototype);

// Attention! Значение 'Bar.prototype.constructor' изчезает.
// Возможно, вам придется вручную исправить его, если
// вы привыкли полагаться на такие свойства!
Bar.prototype.myLabel = function () {
    return this.label;
};

var e = new Bar('e', 'obj e');

console.log(e);
console.log(e.myName()); // 'e'
console.log(e.myLabel()); // 'obj e'

// -6- analysis the class inheritance-----------
function Foo6() {}

var x = new Foo6();

console.log(Foo6.prototype.isPrototypeOf(x)); // true

// ---ES-5----
console.log(Object.getPrototypeOf(x) === Foo6.prototype); // true

// -7- create a connection with call the Create() ---
var foo = {
    something: function () {
        console.log('Tell me something good ...');
    },
};

var bar = Object.create(foo);

bar.something(); // Tell me something good ...

// -7-1- Object.create() in ES6----------------
var anotherObject1 = {
    a: 7,
};

var myObject1 = Object.create(anotherObject1, {
    b: {
        enumerable: false,
        writable: true,
        configurable: false,
        value: 1,
    },
    c: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 5,
    },
});

console.log(myObject1.hasOwnProperty('a')); // false
console.log(myObject1.hasOwnProperty('b')); // true
console.log(myObject1.hasOwnProperty('c')); // true

console.log(myObject1.a); // 7
console.log(myObject1.b); // 1
console.log(myObject1.c); // 5
