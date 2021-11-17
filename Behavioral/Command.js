//изоляция запросов или операций в отдельные объкты
//Ослабляет связь(развязывает) Объекты которые посылают запрос
//от объектов ответственных за выполнение запросов

//Пример
//Сlient -----uses-----> API.methods inside APP
//implementation(API.methids) ----> changed
//API.method.call -----change-----> APP 
// => many changes in different places => bad

//мы могли бы использовать абстракцию и отделить запрашиваемые 
//объекты от тех, которые реализуют запрос

//1. Invoker(передатчик): просит команду выполнить запрос
//2. Команда: знает про действие и привязывает к получателю(приемнику),
//  вызывая на нем соответствующую операцию
//3. Приемник(получателя): Знаеt как выполнять операции связаные с командой 
//4. Клиент: создает команду и устанавливает приемник который получит команду


//Использовать:
//  1. ставить в очередь и выполнять запросы в разное время
//  2. Выполнять операции как отмены или сброс
//  3. Хранить историю зпросов

function Command() {
    this.execute = function() {};
}

function TurnOnPrinter(printingMachine) {
    this.printingMachine = printingMachine;
    this.commandName = "turn on";

    
    this.execute = function() {
        this.printingMachine.turnOn();
    }
}

function TurnOffPrinter(printingMachine) {
    this.printingMachine = printingMachine;
    this.commandName = "turn off";
    
    this.execute = function() {
        this.printingMachine.turnOff();
    }
}

function Print(printingMachine) {
    this.printingMachine = printingMachine;
    this.commandName = "print" 
    
    this.execute = function() {
        this.printingMachine.print();
    }
}

TurnOnPrinter.prototype = new Command();
TurnOffPrinter.prototype = new Command();
Print.prototype = new Command();

//Invoker
function PrinterControlPanel() {
    this.pressButton = function(command) {
        console.log(`Pressing ${command.commandName} button`);
        command.execute();

    }
}

//Reciever: 
class PrintingMachine {

    turnOn() {
      console.log('Printing machine has been turned on');
    }
    
    turnOff() {
      console.log('Printing machine has been turned off');
    }
  
    print(){
        console.log('The printer is printing your document')
    }
  }


//Приемник
const printingMachine = new PrintingMachine();

//Команды
const turnOnCommand = new TurnOnPrinter(printingMachine);
const turnOffCommand = new TurnOffPrinter(printingMachine);
const printCommand = new Print(printingMachine);

//Передатчик
const controlPanel = new PrinterControlPanel();

//Клиент просит передатчик выполнить команды
controlPanel.pressButton(turnOnCommand);
controlPanel.pressButton(turnOffCommand);
controlPanel.pressButton(printCommand);


//Chellenge

console.log('\r\n------------------------------\r\n');

function BankCommand() {
    this.execute = function() {};
}

class BankAccount {
    constructor(amount){
        this.amount = amount
    }

    checkAmount() {
        console.log(this.amount)
    }

    withDrawAmount(anAmount) {
        if(anAmount > this.amount){
            console.log("Not enough money")
        }
        else {
            this.amount -=  anAmount
        }
    }

    depositAmount(anAmount) {
        this.amount += anAmount;
    }
}

function CheckAmount(bankAccount) {
    // console.log(bankAccount.amount);
    this.bankAccount = bankAccount;
    
    this.execute = function() {
        this.bankAccount.checkAmount();
    }
}

function WithDrawAmount(bankAccount) {
    this.bankAccount = bankAccount;
    
    this.execute = function(amount) {
        this.bankAccount.withDrawAmount(amount);
    }
}

function DepositAmount(bankAccount) {
    this.bankAccount = bankAccount;
    this.execute = function(amount) {
        this.bankAccount.depositAmount(amount);
    }
}

function AccountManager() {
    this.request = function (command, amount) {
        command.execute(amount);
    }
}


CheckAmount.prototype = new BankCommand();
WithDrawAmount.prototype = new BankCommand();
DepositAmount.prototype = new BankCommand();


// var account = new BankAccount(100);
// account.checkAmount();
// account.withdrawMoney(10);
// account.checkAmount();
// account.depositAmount(50);
// account.checkAmount();

const manager = new AccountManager();
const account = new BankAccount(100)


const check = new CheckAmount(account);


const withdraw = new WithDrawAmount(account);
const deposit = new DepositAmount(account);

manager.request(check);
manager.request(withdraw, 10);
manager.request(check);
manager.request(deposit, 50);
manager.request(check);



//Osmany Implementation
//спрятать, извлеч вызовы методов, запросов или операций в отдельный объект
//что дает мозможность одновременно передавать запрос и его параметры в этот объект
// ЗЫ: похоже на чтото но не могу вспомнить что на стороне сервера. Нада вспомнить)


let command = (function(){
    var CarManager = {
        // request information
        requestInfo: function( model, id ){
            return 'The information for ' + model +
            ' with ID ' + id + ' is foobar';
        },// purchase the car
        buyVehicle: function( model, id ){
            return 'You have successfully purchased Item '
            + id + ', a ' + model;
        },
        // arrange a viewing
        arrangeViewing: function( model, id ){
            return 'You have successfully booked a viewing of '
            + model + ' ( ' + id + ' ) ';
        },
        differentArgNum: function(model, id, failure) {
            return "This is a different" + failure;
        }
    };

    

    return CarManager;
})();

command.execute = function (name) {
    return this[name] && this[name].apply(this, [].slice.call(arguments, 1));
};

// console.log(command);
console.log(command.execute("buyVehicle", "Ford Escort", "453543"));
console.log(command.execute("arrangeViewing", "Ferrari", "14523"));
console.log(command.execute("requestInfo", "Ford Mondeo", "54323"));
console.log(command.execute("requestInfo", "Ford Escort", "34232"));
console.log(command.execute("buyVehicle", "Ford Escort", "34232"));
console.log(command.execute("differentArgNum", "Ford Escort", "34232", "<DIFF>"));