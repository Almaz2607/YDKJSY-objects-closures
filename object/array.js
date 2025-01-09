// ---example-1-1----------------
var myArray = ['foo', 58, 'bar'];

myArray.length; // 3
myArray[0]; // foo
myArray[2]; // bar

// ---example-1-2----------------
var myArr = ['foo', 77, 'bar'];

myArr.baz = 'baz';

console.log(myArr.length); // 3
console.log(myArr.baz); // baz

// ---example-2----------------
var myArr2 = ['foo', 99, 'bar'];

myArr2['3'] = 'baz';
console.log(myArr2.length); // 4
console.log(myArr2[3]); // baz

// ---duplication of objects--------
function anotherFunction() {}

var anotherObject = {
    c: true,
};

var anotherArray = [];

var myObject = {
    a: 5,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction,
};

var newObj = Object.assign({}, myObject);

console.log(newObj.a); // 5
console.log(newObj.b === anotherObject); // true
console.log(newObj.c === anotherArray); // true
console.log(newObj.d === anotherFunction); // true

// ---property-descriptors-------
var myObject2 = {
    a: 7,
};

console.log(Object.getOwnPropertyDescriptor(myObject2, 'a'));
// {value: 7,
// writable: true,
//  enumarable: true,
//  configurable: true}

// ---define-property---------
// --1-writable-----------
var myObject3 = {};

Object.defineProperty(myObject3, 'b', {
    value: 81,
    writable: false,
    enumerable: true,
    configurable: true,
});

myObject3.b = 33;

console.log(myObject3); // 81

// ---2-configurable----------
var myObject4 = {
    a: 6,
};

console.log(myObject4.a); // 6
delete myObject4.a;
console.log(myObject4.a); // undefined

Object.defineProperty(myObject4, 'a', {
    value: 5,
    writable: true,
    configurable: false,
    enumerable: true,
});

console.log(myObject4.a); // 5
delete myObject4.a;
console.log(myObject4.a); // 5

// ---immutability-----------------
// -1-object-constants--------
var myObject5 = {};

Object.defineProperty(myObject5, 'FAVORITE_NUMBER', {
    value: 88,
    writable: false,
    configurable: false,
});

myObject5['FAVORITE_NUMBER'] = 44;

console.log(myObject5['FAVORITE_NUMBER']); // 88

// ---2-prevent-extension--------
var myObject6 = {
    a: 4,
};

Object.preventExtensions(myObject6);
myObject6.a = 7;
myObject6.b = 8;
console.log(myObject6.a); // 7
console.log(myObject6.b); // undefined

// ---3-seal---------------------
var myObject7 = {
    a: 11,
};

Object.seal(myObject7);

delete myObject7.a;
console.log(myObject7.a); // 11
myObject7.b = 33;
console.log(myObject7.b); // undefined

// ---4-freeze------------------
var myObject8 = {
    a: 444,
};

Object.freeze(myObject8);

myObject8.a = 555;
console.log(myObject8.a); // 444
