// ---lexical-scope---------
function foo() {
    var a = 2;

    function bar() {
        console.log(a);
    }

    bar();
}

foo(); // 2

// ---closures-1----------
function foo2() {
    var a = 5;

    function bar() {
        console.log(a);
    }

    return bar;
}

var baz = foo2();

baz(); // 5

// ---closures-2---------
function foo3() {
    var a = 8;

    function baz() {
        console.log(a);
    }

    bar(baz);
}

function bar(fn) {
    fn();
}

foo3(); // 8

// ---closures-3--------
var fn;

function foo4() {
    var str = 'Hello';

    function baz() {
        console.log(str);
    }

    fn = baz;
}

function bar4() {
    fn();
}

foo4();
bar4(); // Hello

// ---closures-4-------
function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000);
}

wait('Hello, closures!');
// Hello, closures!
