//1. Повторное использование или совместное использование объектов
//2. Если есть несколько семейств связанных объектов которые необходимо использовать вместе
//3. Кеширование
//4. Защита процесса создания объекта от клиента
function Soda(name,type,price) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.display = function(){
        console.log(`The ${this.type} ${this.name} costs ${this.price} dollars`)
    }
}

function Chips(name,type,price) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.display = function(){
        console.log(`The ${this.type} ${this.name} costs ${this.price} dollars`)
    }
}

function JunkFoodFactory(){
    var junkfood;
    this.createJunkFood = function(name,type,price) {
        switch (name) {
            case "chips":
                junkfood =  new Chips(name,type,price);
                break;
            case "soda":
                junkfood = new Soda(name,type,price);
                break;
            default:
                junkfood = new Chips(name,type,price);
                break;
        }
        return junkfood;
    }  
}
 

var factory = new JunkFoodFactory();
var chips = factory.createJunkFood("chips","potato",1.50);
chips.display();

chips = factory.createJunkFood("chips","corn",2.50);
chips.display();

var soda = factory.createJunkFood("soda", "Energy Drink", 10);
soda.display();

soda = factory.createJunkFood("soda", "Cola", 7);
soda.display();
//---firstIteration
// function HomeLoan(amount,duration){
//     this.amount = amount
//     this.interest = 0.08
//     this.duration = duration
//     this.calculateInterest = function(){
//       return this.amount*this.interest*this.duration
//     }
//   }
  
//   function StudentLoan(amount,duration){
//     this.amount = amount
//     this.interest = 0.03
//     this.duration = duration
//     this.calculateInterest = function(){
//       return this.amount*this.interest*this.duration
//     }
//   }
  
//   function PersonalLoan(amount,duration){
//     this.amount = amount
//     this.interest = 0.05
//     this.duration = duration
//     this.calculateInterest = function(){
//       return this.amount*this.interest*this.duration
//     }
//   }
  
//   function Loans(){
//     this.getloan = function(type,amount,duration){
//       var loan;
//       switch(type){
//         case 'home':
//           loan = new HomeLoan(amount,duration)
//           break;
//         case 'student':
//           loan = new StudentLoan(amount,duration)
//           break;
//         case 'personal':
//           loan = new PersonalLoan(amount,duration)
//           break;
//         default :
//           loan = null
//           break;
//       }
//       return loan
//     }
//   }

  //END

//Займы: домашний, студенческий, личный

function Home(amount, duration) {
    this.interest = 0.08;
    
    this.amount = amount;
    this.duration = duration;
}
function Student(amount, duration) {
    this.interest = 0.03;
    
    this.amount = amount;
    this.duration = duration;
    
}
function Personal(amount, duration) {
    this.interest = 0.05;

    this.amount = amount;
    this.duration = duration;
}

function LoansFactory() {
    
}
//Фабрика хранит екземпляр сущности
LoansFactory.prototype.calculateInterest = function() {
    let totalInterest = this.instance.interest * this.instance.amount * this.instance.duration;
    console.log(totalInterest);
    return totalInterest;
}

LoansFactory.prototype.getLoan = function( amout, duration ) {
    this.instance = new this.loan(amout, duration)
    return this.instance;
}

function Loans() {
    let loanFac = new LoansFactory();

    this.getLoan = function(type, amout, duration) {
        switch (type) {
            case "home":
                LoansFactory.prototype.loan = Home;
                break;
            case "student":
                LoansFactory.prototype.loan = Student;
                break;
            case "personal":
                LoansFactory.prototype.loan = Personal;
                break;
            default:
                break;
        }
        // loan = loanFac.getLoan(amout, duration);
        // console.log("Loans", loanFac);
        return loanFac.getLoan(amout, duration);
    };

    this.calculateInterest = function() {
        return loanFac.calculateInterest();
    }
}



var loan = new Loans();

var homeLoan = loan.getLoan('home',3200,5)
loan.calculateInterest();

var studentLoan = loan.getLoan('student',1800,4)
loan.calculateInterest();

var personalLoan = loan.getLoan('personal',1200,2)
loan.calculateInterest();