// ---example-1-1---------
function doSomething(a) {
    b = a + doSomethingElse(a * 2);

    console.log(b * 3);
}

var b;

function doSomethingElse(a) {
    return a - 1;
}

doSomething(2); // 15

// ---example-1-2----------
function doSomething2(a) {
    var b;

    b = a + doSomethingElse(a * 2);

    function doSomethingElse(a) {
        return a - 1;
    }

    console.log(b * 3);
}

doSomething2(2); // 15

// ---conflict-prevention------
function foo() {
    function bar(a) {
        var i = 3;
        console.log(a + i);
    }

    for (var i = 0; i < 5; i++) {
        bar(i * 2);
    }
}

foo();

// ---global-namespaces------
var MyReallyCoolLibrary = {
    awesome: 'stuff',
    doSomething: function () {
        // ...
    },
    doAnotherSomething: function () {
        // ...
    },
};

// ---functions-as-scope-------
var a = 2;

function foo2() {
    var a = 3;
    console.log(a);
}

foo2(); // 3

console.log(a); // 2

// --IIFE-example-1---
var a1 = 1;

(function IIFE() {
    var a1 = 4;
    console.log(a1); // 4
})();

console.log(a1); // 1

// ---IIFE-example-2--
var a2 = 5;

(function IIFE(global) {
    var a2 = 7;
    console.log(a2); // 7
    console.log(global.a2); // 5
})(window);

// ---IIFE-example-3-UMD--
// -universal-module-definition--
var a3 = 9;

(function IIFE(def) {
    def(window);
})(function def(global) {
    var a3 = 8;
    console.log(a3); // 8
    console.log(global.a3); // 9
});
