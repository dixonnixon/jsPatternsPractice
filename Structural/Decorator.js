//Использовать: изменять и расширять фенкционал сущ. объектов без изменения их кода
//2. Когда много объектов опираютс на одинаклвый код
//3.  Вместо того чтоб добавлять функционал через создание и подклассы - легче использовать декоратор
//4. Пример: текст с форматированием: курсив, жирный и подчеркнут
//5. Когда очень много подклассов лучше делать Декоратор!
//firstIter
function FrozenYohurt(flavor, price) {
    this.flavor = flavor;
    this.price = price;
}

FrozenYohurt.prototype.orderPlaces = function() {
    console.log(`The ${this.flavor} flavor will cost you ${this.price} dollars`);
}

//decor1

function addFlavors(yohurt) {
    yohurt.addStrawberry = true;
    yohurt.addVanilla = true;
    yohurt.price += 20;

    yohurt.info = function() {
        console.log(`The updated price after adding flavors is ${yohurt.price} UAH`);
    }
    return yohurt;
}

function addToppings(yohurt) {
    yohurt.hasSprincles = true;
    yohurt.hasBrowie = true;
    yohurt.hasWafers = true;
    yohurt.price += 20;

    yohurt.allToppings = function() {
        console.log("Your froyo has sprinkles, brownie, and wafers");
    }
    return yohurt;
}

const frozenYohurt = new FrozenYohurt('chocolate', 10);
frozenYohurt.orderPlaces();

let frozenWithFlavors = addFlavors(frozenYohurt);
frozenWithFlavors.info();

let frozenWithToppings = addToppings(frozenYohurt);
frozenWithToppings.allToppings();

console.log("---------------------------------------------------------");


//challenge
function SuperHero(name, power) {
    this.name = name;
    this.power = power;
}

// function SwordsMan(name, power) {
//     SuperHero.call(this, name, power);
//     this.sword = true;
// }

// SwordsMan.prototype.hasSword = function () {
//     return `${this.name}'s power is ${this.power}, and he also has a sword now.`;
// }

// function JetMan(name, power) {
//     SuperHero.call(this, name, power);
//     this.superSpeed = true;
// }

// JetMan.prototype.hasSuperSpeed = function () {
//     return `${this.name}'s power is ${this.power}, and he also has the super speed now.`;
// }

// function JetBladeMan(name, power) {
//     SuperHero.call(this, name, power);
//     this.superSpeed = true;
// }

// JetBladeMan.prototype.hasSpeedandSword = function () {
//     return `${this.name}'s power is ${this.power}, and he also has both super speed and a sword now.`;
// }

// var superHero = new SwordsMan("Fire Man", "Fire");
// console.log(superHero.hasSword());

// var speedHero = new JetMan("Fire Man", "Fire");
// console.log(speedHero.hasSuperSpeed());

// var jetBlader = new JetBladeMan("Ice Man", "Ice")
// console.log(jetBlader.hasSpeedandSword());

//Make functions insted of classes

function SwordsMan(superhero) {
    superhero.sword = true;

    superhero.hasSword = function () {
        return `${this.name}'s power is ${this.power}, and he also has a sword now.`;
    }
    return superhero;
}

function JetMan(superhero) {
    superhero.superSpeed = true;
    superhero.hasSuperSpeed = function () {
        return `${this.name}'s power is ${this.power}, and he also has the super speed now.`;
    }
    return superhero;
}

function JetBladeMan(superhero) {
    superhero.speedAndSword = true;
    superhero.hasSpeedandSword = function () {
        return `${this.name}'s power is ${this.power}, and he also has both super speed and a sword now.`;
    }
}

var superhero1 = new SuperHero("Fire Man", "Fire");
SwordsMan(superhero1);
JetMan(superhero1);
console.log(superhero1.hasSword());
console.log(superhero1.hasSuperSpeed());

var superhero2 = new SuperHero("Ice Man", "Ice");
JetBladeMan(superhero2);
console.log(superhero2.hasSpeedandSword());