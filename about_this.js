// benefit from "this"
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
}

var my = {
    name: 'Kyle',
};

var you = {
    name: 'Almaz',
};

console.log(identify.call(my)); // KYLE
console.log(identify.call(you)); // ALMAZ

speak.call(my); // Hello, I'm KYLE
speak.call(you); // Hello, I'm ALMAZ

// example without "this"--------------
function foo(num) {
    console.log('foo: ' + num);
    foo.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}

console.log(foo.count);

// -------with-"this"------------------
function foo2(num) {
    console.log('foo2: ' + num);
    this.count++;
}

foo2.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo2.call(foo2, i);
    }
}

console.log(foo2.count);

// концепция стека вызовов и точки вызова
function baz() {
    // стек вызова: `baz`
    // место вызова- глобальная обл. видим.
    console.log('baz');
    bar(); // место вызова для `bar`
}

function bar() {
    // Стек вызовов: `baz` -> `bar`
    // место вызова функция - `baz`
    console.log('bar');
    foo3(); // Место вызова для `foo3`
}

function foo3() {
    // call stack: `baz` -> `bar` -> `foo3`
    // место вызова функция - `bar`
    console.log('foo3');
}

baz(); // <-- Место вызова для `baz`

// ---1-default binding------------
function foo4() {
    console.log(this.a);
}

var a = 2;

foo4(); // 2

// ---2-implicit-binding-------------
// ---example-1----------
function dub() {
    console.log(this.q);
}

var obj = {
    q: 8,
    dub: dub,
};

obj.dub(); // 8

// ---example-2-----------
function cab() {
    console.log(this.v);
}

var obj2 = {
    v: 77,
    cab: cab,
};

var obj1 = {
    v: 11,
    obj2: obj2,
};

obj1.obj2.cab(); // 77

// ---implicit-loss-"this"---------
// ---example-1----------
function loss() {
    console.log(this.y);
}

var obj3 = {
    y: 33,
    loss: loss,
};

var cop = obj3.loss;
var y = 'oops, global ';

cop(); // oops, global

// ---example-2----------
function loss2() {
    console.log(this.g);
}

function doLoos(fn) {
    // fn - просто еще одна ссылка на loss2
    fn(); // <-- call place
}

var obj4 = {
    g: 6,
    loss2: loss2,
};

var g = 'oops, global loos2';

doLoos(obj4.loss2); // oops. global loos2

// ---3-explicit-binding------------
function expl() {
    console.log(this.e);
}

var obj5 = {
    e: 88,
};

expl.call(obj5); // 88

// ---hard-binding---------------
// ---example-1----------
function harB() {
    console.log(this.h);
}

var obj6 = {
    h: 22,
};

var hod = function () {
    harB.call(obj6);
};

hod(); // 22
// setTimeout(hod, 1000); // 22
// у жестко связанной функции `hod`
//  значение `this` не может заменяться
hod.call(window); // 22

// ---example-2--------------
function sel(something) {
    console.log(this.s, something);
    return this.s + something;
}

function bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    };
}

var cub = {
    s: 44,
};

var sup = bind(sel, cub);

var res = sup(77); // 44 77
console.log(res); // 121

// --4-binding-new-------------
function foon(a) {
    this.a = a;
}

var barn = new foon(2);
console.log(barn.a); // 2

// ---priority-of-rules-----
// implicit or explicit rule
function pri() {
    console.log(this.a);
}

var obj7 = {
    a: 3,
    pri: pri,
};

var obj8 = {
    a: 7,
    pri: pri,
};

obj7.pri(); // 3
obj8.pri(); // 7

obj7.pri.call(obj8); // 7
obj8.pri.call(obj7); // 3

// implicit or new rule
function prior(something) {
    this.a = something;
}

var obj9 = {
    prior: prior,
};

var obj10 = {};

obj9.prior(27);
console.log(obj9.a); // 27

obj9.prior.call(obj10, 92);
console.log(obj10.a); // 92

var bari = new obj9.prior(84);
console.log(obj9.a); // 27
console.log(bari.a); // 84

// explicit or new rule
function exOrNew(something) {
    this.a = something;
}

var obej = {};

var barj = exOrNew.bind(obej);
barj(40);
console.log(obej.a); // 40

var bazj = new barj(95);

console.log(obej.a); // 40
console.log(bazj.a); // 95

// ---passing 'null' as 'this'---------------
function out(a, b) {
    console.log('a:' + a + ', b:' + b);
}

// распределение массива по параметрам
out.apply(null, [2, 5]); // a:2, b:5

// Каррирование вызовом `bind(..)`
var baro = out.bind(null, 8);
baro(3); // a:8, b:3
