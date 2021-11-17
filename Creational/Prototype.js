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
}

Ninja.prototype.fight = function(ninja, score) {

    if(ninja.points > 0 && this.points > 0) {
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






var ninja1 = new Ninja('Ninja1');
var ninja2 = new Ninja('Ninja2');

console.log(ninja1.kick(ninja2));
console.log(ninja2.punch(ninja1));
console.log(ninja1.kick(ninja2));
console.log(ninja1.punch(ninja2));
console.log(ninja2.kick(ninja1));