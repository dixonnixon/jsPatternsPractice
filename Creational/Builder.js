//Использовать 1. при создании комплексных объектов (сокритие процесса создания сложного обьекта)
//2. DOM: создание огромного количества елементов и сложных елементов документа
//3. Позволяет создать комплекусный объект ( в зависимости от того)
function Order() {
    this.course = null;
    this.side = null;
    this.drinks = [];
    
    this.addCourse = function(course) {
        this.course = course;        
    };

    this.addSide = function(side) {
        this.side = side;        
    };
    
    this.addDrink = function(drink) {
        this.drinks.push(drink);
    };
    
    this.display = function() {
        let view = `MEAL: ${this.course}, SIDE: ${this.side}, DRINK: ${this.drinks.join(", ")}`;
        console.log(view);       
    };
}

function Meal() {
    this.make = function(builder) {
        builder.step1();
        builder.step2();
        builder.step3();
        builder.step4();

        return builder.get();
    }
}

function MealBuilder(main, side, drink) {
    this.meal = null;

    this.step1 = function() {
        this.meal = new Order();
    }

    this.step2 = function() {
        this.meal.addCourse(main);
    };
    
    this.step3 = function() {
        this.meal.addSide(side);
    };

    this.step4 = function() {
        this.meal.addDrink(drink);
    };

    this.get = function() {
        return this.meal;
    };
}

let meal = new Meal();
let mealBuilder = new MealBuilder("chicken", "fries", "Cola");

let chickenBurger = meal.make(mealBuilder);
chickenBurger.addDrink("Soda");

chickenBurger.display();

//Excercise Subject

function Assignment() {
    this.make = function(subjectBuilder) {
        subjectBuilder.createSubject();
        subjectBuilder.setComplexity();
        subjectBuilder.setDueDate();

        return subjectBuilder.display();
    }
}

function AssignmentBuilder(topic, level, dueDate) {
    this.subject = null;

    this.createSubject = function() {
        this.subject = new Subject(topic);
    };

    this.setComplexity = function() {
        this.subject.addLevel(level);
    };
    
    this.setDueDate = function() {
        this.subject.addDueDate(dueDate);
    };

    this.display = function() {
        return this.subject;
    };
}

function Subject(topic) {
    this.addLevel = function(level) {
        this.level = level;
    };
    
    this.addDueDate = function(date) {
        this.date = date;
    };

    this.announcement = function() {
        let view = `Your ${topic} assignment's difficulty level is: ${this.level}. It is due on ${this.date}`;
        console.log(view);       
    };
}

try{
    var assignment = new Assignment();
    var assignmentBuilder = new AssignmentBuilder("Math","Hard","12th June, 2020");
    var mathAssignment = assignment.make(assignmentBuilder);
    mathAssignment.announcement(); 
}catch(e){
    console.log(e);
}