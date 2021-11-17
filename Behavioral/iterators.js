function extend(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}


//---------------


let iterableThings = [
    Array.of(1, 2),
    typedArr = Int16Array.of(3, 4),
    new Map([[5, 6], [7, 8]]),
    new Set([9, 10])
];

for (const iterableThing of iterableThings) {
    for(const x of iterableThing) {
        console.log(x);
    }
}

let arr1 = [1, 2, 3];
let arr2 = [...arr1];

console.log(...arr1);
console.log(...arr2);
console.log(arr2 === arr1);

let map1 = new Map([[1, 2], [3, 4]]);
let map2 = new Map(map1);

console.log(map1, map2);


function FooArray() {
    console.log(arguments);
    for(let i = 0; i< arguments.length; i+=1 )
    {
        this[i] = arguments[i];
    }
}
extend(FooArray, Array);
// FooArray.prototype = new Array();

let fooArr = new FooArray('foo', 'br', 'bz');
console.log(fooArr);

for(let el in fooArr) {
    console.log(fooArr, el);
}


class FooArrayA extends Array {}
let fooArrA = new FooArrayA('foo', 'bar', 'baz');
for (let el of fooArr) {
    console.log(el);
}

//Неясно как правильно наследовать обьекты он массива в ES15

let arrrr = ['foo', 'bArr'];
console.log(Symbol.iterator, arrrr[Symbol.iterator]);
console.log(arrrr[Symbol.iterator]());

let iter = arrrr[Symbol.iterator]();
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());


//is this an infinite iterator
function Foo() {
    this[Symbol.iterator] = function() {
        return {
            next() {
                return { done: false, vlue: 'foo'}
            }
        }
    }
}


let f = new Foo();
let iterF = f[Symbol.iterator]();
console.log(iterF);
console.log(iterF.next());
console.log(iterF.next());
console.log(iterF.next());

let a = Array.of(1, 2);
let aIter = a[Symbol.iterator]();


console.log(aIter);
console.log(aIter.next());
console.log(aIter.next());
console.log(aIter.next());

//So this is a custom iterator definition
function Counter(limit) {
    this.count = 0;
    this.limit = limit;

    this[Symbol.iterator] = function() {
        return this;
    }
        
    this.next = function() {
        // console.log(this);
        
        if(this.has()) {
            this.count += 1;
            return { done: false, value: this.count };
        }
        else 
            return { done: true, value: undefined };
    };

    this.has = function() {
        // console.log(this);
        return this.count < this.limit;
    };

    this.return = function() {
        console.log("broken");
        return { done: true };
    }
}

let counter = new Counter(3);
// let counterIt = counter[Symbol.iterator]();


// console.log(counterIt.next());
console.log("//////////////////////////");
for(let i of counter)
{
    console.log(i);
    if(i == 2) break;
}

let counter1 = new Counter(5);
// let counterIt = counter[Symbol.iterator]();


// console.log(counterIt.next());
console.log("//////////////////////////");
try {
    for(let i of counter1)
    {
        console.log(i);
        if(i == 4) throw 'err';
    }

} catch (e) { console.log(e)};

let counter3 = new Counter(2);

console.log("------------------------/////C3");
let [a1, b1] = counter3;


console.log("-NotClosedIterator");
let a12 = [1,2,3,4,5];
let iter2 = a12[Symbol.iterator]();

for(let i of iter2) {
    console.log(i);
    if(i > 2) { break; }
}
console.log("somwhere elese... in code");

for(let i of iter2) {
    console.log(i);
}

console.log("////\r\n");
let a3 = [1, 2, 3, 4, 5];
let iter4 = a3[Symbol.iterator]();

iter4.return = function() {
    console.log('Exiting early');
    return { done: true };
};

for (let i of iter4) {
    console.log(i);
    if (i > 2) {
        break;
    }
}


//->fR: найти способ итераторами задавать простые геттеры и сеттеры всех
//  базовых свойств чтоб не писать все это каждый раз))
//  1.Обойти объект
//  2. Найти названия свойств и с помощью ObjectDefineProperty созать целевые
        // методы

          // this.keys = Object.keys(this);

    // for(let i of this.keys) {
    //     // console.log(i, this);
    //     Object.defineProperty(this, i, {
    //         get: () => this[i],
    //         set: (v) => this[i] = v
    //     });
    // }