// ---syntax of objects--------
// -1- declarative form ---
var myObj = {
    key: 2,
    // ...
};

// -2- constructed form ---
var myObj2 = new Object();
myObj2.key = 1;

// ---example-1----------
var myObject = {
    a: 5,
};

console.log(myObject.a); // 5
console.log(myObject['a']); // 5

// ---example-2----------
var prefix = 'foo';

var myObj2 = {
    [prefix + 'bar']: 'hello',
    [prefix + 'baz']: 'world',
};

console.log(myObj2['foobar']); // hello
console.log(myObj2['foobaz']); // world

// ---example-3----------
var myObj3 = {
    foo: function foo() {
        console.log('foo');
    },
};

var someFoo = myObj3.foo;

console.log(someFoo); // function foo() {}
console.log(myObj3.foo); // function foo() {}
