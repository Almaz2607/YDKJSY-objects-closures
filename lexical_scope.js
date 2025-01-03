// ---example-1--------------
function foo(a) {
    var b = a * 2;

    function bar(c) {
        console.log(a, b, c);
    }

    bar(b * 3);
}

foo(2); // 2, 4, 12

// ---example-2-------------
function foo2(str, a) {
    eval(str); // changes scope
    console.log(a, b);
}

var b = 2;
foo2('var b = 3', 1); // 1, 3

// ---example-3-------------
function foo3(obj) {
    with (obj) {
        a = 2;
    }
}

var o1 = {
    a: 3,
};
var o2 = {
    b: 3,
};

foo3(o1);
console.log(o1.a); // 2

foo3(o2);
console.log(o2.a); // undefind
console.log(a); // 2 leakage
