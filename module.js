// ---example-1-------------
function CoolModule() {
    var something = 'cool';
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }

    function doAnother() {
        console.log(another.join(' ! '));
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother,
    };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// ---example-2--------------
function CoolModule2(id) {
    function identify() {
        console.log(id);
    }

    return {
        identify: identify,
    };
}

var foo2 = CoolModule2('foo 2');
var foo3 = CoolModule2('foo 3');

foo2.identify(); // foo 2
foo3.identify(); // foo 3

// ---example-3---------------
var foo4 = (function CoolModule(id) {
    function change() {
        publicAPI.identify = identify2;
    }

    function identify1() {
        console.log(id);
    }

    function identify2() {
        console.log(id.toUpperCase());
    }

    var publicAPI = {
        change: change,
        identify: identify1,
    };

    return publicAPI;
})('foo module');

foo4.identify(); // foo module
foo4.change();
foo4.identify(); // FOO MODULE

// ---modern-modules-example---
var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }

        modules[name] = impl.apply(impl, deps);
    }

    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get,
    };
})();

// ---define-module-1-------------
MyModules.define('bar', [], function () {
    function hello(who) {
        return 'Let me introduce: ' + who;
    }

    return {
        hello: hello,
    };
});

// ---define-module-2---------------
MyModules.define('foo', ['bar'], function (bar) {
    var hungry = 'hippo';

    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }

    return {
        awesome: awesome,
    };
});

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(bar.hello('hippo'));
// Let me introduce: hippo
foo.awesome();
// LET ME INTRODUCE: HIPPO
