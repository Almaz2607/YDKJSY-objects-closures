// ---explicit-mixin-(явные примеси)---
// сильно упрощенный пример `mixin`
function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        // copy if doesn't exist
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }

    return targetObj;
}

var Vehicle = {
    engines: 1,

    ignition: function () {
        console.log('Turning on my engine.');
    },
    drive: function () {
        this.ignition();
        console.log('Steering and moving forward!');
    },
};

var Car = mixin(Vehicle, {
    wheels: 4,

    drive: function () {
        Vehicle.drive.call(this);
        console.log('Rolling on all ' + this.wheels + ' wheels!');
    },
});

console.log(Car.engines); // 1

// альтернативная версия mixin,
// менее 'безопасная' для перезаписи----
function mixin2(sourceObj, targetObj) {
    for (var key in sourceObj) {
        targetObj[key] = sourceObj[key];
    }
    return targetObj;
}

var Vehicle2 = {
    engines: 1,

    ignition: function () {
        console.log('Turning on my engine.');
    },
    drive: function () {
        this.ignition();
        console.log('Steering and moving forward!');
    },
};

// сначала создать пустой объект, в который
// копируется содержимое из Vehicle
var Car2 = mixin2(Vehicle, {});

// Теперь скопировать предполагаемое
// содержимое в Car
mixin2(
    {
        wheels: 4,
        drive: function () {
            this.ignition();
            console.log('Rolling on all ' + this.wheels + ' wheels!');
        },
    },
    Car2
);

console.log(Car2);

// -parasitic inheritance-(паразитное наследование)------------
// -traditional class JS 'Vehicle'
function Vehicle3() {
    this.engines = 1;
}

Vehicle3.prototype.ignition = function () {
    console.log('Turning on my engine.');
};
Vehicle3.prototype.drive = function () {
    this.ignition();
    console.log('Steering and moving forward!');
};

// -parasitic class 'Car'-----
function Car3() {
    // at first the 'Car' is the 'Vehicle'
    var car = new Vehicle3();

    // change 'car' for create specialize
    car.wheels = 4;

    // save the privileged ref on the 'Vehicle::drive()'
    var vehDrive = car.drive;

    // redefine 'Vehicle::drive()'
    car.drive = function () {
        vehDrive.call(this);
        console.log('Rolling on all ' + this.wheels + ' wheels!');
    };

    return car;
}

var myCar = new Car3();
myCar.drive();
// Turning on my engine
// Steering and moving forward!
// Rolling on all 4 wheels!

// -implicit mixin-(неявные примеси)-----------
var Something = {
    cool: function () {
        this.greeting = 'Hello, World';
        this.count = this.count ? this.count + 1 : 1;
    },
};

Something.cool();
console.log(Something.greeting); // Hello, World
console.log(Something.count); // 1

var Another = {
    cool: function () {
        // implicit mixin 'Something' to 'Another'
        Something.cool.call(this);
    },
};

Another.cool();
console.log(Another.greeting); // Hello, World
console.log(Another.count); // 1
