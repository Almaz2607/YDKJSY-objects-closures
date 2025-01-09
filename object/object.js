// ---syntax of objects--------
// -1- declarative form ---
var myObjD = {
    key: 2,
    // ...
};

// -2- constructed form ---
var myObjC = new Object();
myObjC.key = 1;

// ---example-1----------
var myObj = {
    a: 5,
};

console.log(myObj.a); // 5
console.log(myObj['a']); // 5

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

// ---getter and setter-------------
// ---example-1--------
var myObject = {
    // define a getter for 'a'
    get a() {
        return 2;
    },
};

Object.defineProperty(
    myObject, // receiver
    'b', // property name
    {
        // descriptor
        // define a getter for 'b'
        get: function () {
            return this.a * 2;
        },
        // to include a property 'b' in
        // the object's property list
        enumerable: true,
    }
);

console.log(myObject.a); // 2
console.log(myObject.b); // 4

// ---example-2--------
var myObject2 = {
    // define a getter for 'a'
    get a() {
        return this._a_;
    },
    // define a setter for 'a'
    set a(val) {
        this._a_ = 2 * val;
    },
};

myObject2.a = 7;
console.log(myObject2.a); // 14

// ---existence-существование---
var myObject3 = {
    a: 2,
};

console.log('a' in myObject3); // true
console.log('b' in myObject3); // false

console.log(myObject3.hasOwnProperty('a')); // true
console.log(myObject3.hasOwnProperty('b')); // false

// ---enumerable-перечисление---
// ---example-1---
var myObject4 = {};

Object.defineProperty(
    myObject4,
    'a',
    // разрешить для `a` перечисление, как обычно
    { enumerable: true, value: 3 }
);

Object.defineProperty(
    myObject4,
    'b',
    // ЗАПРЕТИТЬ для `b` перечисление
    { enumerable: false, value: 7 }
);

console.log(myObject4.b); // 7
console.log('b' in myObject4); // true
console.log(myObject4.hasOwnProperty('b')); //true

// .....

for (var k in myObject4) {
    console.log(k, myObject4[k]);
}
// 'a' 3

// ---example-2------------------
var myObject5 = {};

Object.defineProperty(
    myObject5,
    'a',
    // property 'a' is enumerable
    { enumerable: true, value: 1 }
);

Object.defineProperty(
    myObject5,
    'b',
    // 'b' is not enumerable
    { enumerable: false, value: 9 }
);

console.log(myObject5.propertyIsEnumerable('a')); // true
console.log(myObject5.propertyIsEnumerable('b')); // false

console.log(Object.keys(myObject5)); // ['a']
console.log(Object.getOwnPropertyNames(myObject5)); // ['a', 'b']

// ---enumeration-перебор--------
// ---example-1-------------
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}
// 1 2 3

// ---example-2---ES6---------------
var myArray2 = [5, 7, 9];
for (var v of myArray2) {
    console.log(v);
}
// 5 7 9

// ---@@iterator-for-array-----------
var myArray3 = [4, 6, 8];
var it = myArray3[Symbol.iterator]();

console.log(it.next()); // {value: 4, done: false}
console.log(it.next()); // {value: 6, done: false}
console.log(it.next()); // {value: 8, done: false}
console.log(it.next()); // {value: undefined, done: true}

// ---@@iterator-for-object---------
var myObject6 = {
    a: 3,
    b: 17,
};

Object.defineProperty(myObject6, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
            next: function () {
                return {
                    value: o[ks[idx++]],
                    done: idx > ks.length,
                };
            },
        };
    },
});

// ручной перебор `myObject6`
var it2 = myObject6[Symbol.iterator]();

console.log(it2.next()); // {value: 3, done: false}
console.log(it2.next()); // {value: 17, done: false}
console.log(it2.next()); //{value: undefined, done: true}

// enumeration `myObject6` in `for .. of`
for (var z of myObject6) {
    console.log(z);
}
// 3
// 17
