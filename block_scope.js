// ---example-1---------------
console.log(i); // undefined

for (var i = 0; i < 5; i++) {
    console.log(i);
    // 0 1 2 3 4
}

console.log(i); // 5

// ---example-2--------------
var foo = true;

if (foo) {
    var bar = foo * 2;
}

console.log(bar); // 2

// ---example-3-------------
function process(data) {
    // something interesting
}

// everything declared inside the
// block can be removed after use
{
    let someReallyBigData = {};
    process(someReallyBigData);
}

var btn = document.getElementById('my_button');

btn.addEventListener(
    'click',
    function click(evt) {
        console.log('button clicked');
    },
    /*capturingPhase*/ false
);

// ---example-4-------------
{
    let j;

    for (j = 0; j < 4; j++) {
        let i = j;
        console.log(i); // 0 1 2 3
    }
    console.log(j); // 4
}

// ---example-5------------
var foo5 = true,
    baz = 10;

if (foo5) {
    let bar5 = 7;
    if (baz > bar5) {
        console.log(bar5); // 7
    }
}

console.log(bar5);
// ReferenceError: bar5 is not defined
