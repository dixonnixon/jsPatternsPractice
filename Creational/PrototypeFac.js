//1.Клонирование уже сконфигурированных объектов
//=> клонированные объекты создаются по ссылке вместо передачи копий обьекта
//2. Снизить расходы на создание обьекта
//3. Независимость системы от способа создаваемых ею продуктов
//4. 
var car = {
    drive() {
        console.log("The Beginning of way...");
    },
    brake() {
        console.log("..The End.");
    },
    numOfWheels: 4
};

console.log( car.__proto__);

const car1 = Object.create(car, { color: { value:"red" }});
console.log((car1.__proto__) == car, car1.__proto__) 
car1.drive();
car1.brake();
console.log(car1.numOfWheels, car1.color);

const car2 = Object.create(car);
console.log((car2.__proto__) == car, car2.__proto__) 
car2.drive();
car2.brake();
console.log(car2.numOfWheels, car2.color);

//excercise 
const Ninja = function(name) {

    this.name = name;
    this.points = 100;

    this.isHitable = function(ninja) {
        return (ninja.points > 0 && this.points > 0);
    };
}


Ninja.prototype.fight = function(ninja, score) {

    if(this.isHitable(ninja)) {
        ninja.points -= score;
        return `${ninja.name} points are ${ninja.points}`;
    } 
    else 
    {
        return `Can't kick ${ninja.name}`;
    }
};

Ninja.prototype.kick = function(ninja) {
    return this.fight(ninja, 50);
}

Ninja.prototype.punch = function(ninja) {
    return this.fight(ninja, 20);
}

//тут нужно вернутся к вопросу рефакторинга и как сделать чтоб:
//1. Было 2 обьекта каждий знающий свои очки за удаp (Kick, Punch)
//2. нужно както оперативно проверять Бои для вывода: Перед ударом вынест кудато логику провеки? пока так потом ВЕРНУТЬСЯ И ДОДЕЛАТЬ!
function Hit(ninja) {
    this.points = ninja.points;
    this.do = function() {
        ninja.points -= this.score;
        return `${ninja.name} points are ${ninja.points}`;
    }
}


function Kick() {
    this.score = 20;

    this.hit = function(ninja) {
        ninja.points -= score;
        return `${ninja.name} points are ${ninja.points}`;
    }
}

function Punch() {
    this.score = 50;
    
    this.hit = function(ninja) {
        ninja.points -= score;
        return `${ninja.name} points are ${ninja.points}`;
    }
}



var ninja1 = new Ninja('Ninja1');
var ninja2 = new Ninja('Ninja2');

console.log(ninja1.kick(ninja2));
console.log(ninja2.punch(ninja1));
console.log(ninja1.kick(ninja2));
console.log(ninja1.punch(ninja2));
console.log(ninja2.kick(ninja1));