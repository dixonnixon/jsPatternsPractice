//State machines
function Operation(action, amount) {
    this.state = "good standing";
    this.balance = 40;

    if (this.state == "overdrawn" && action == "withdraw") {
        this.state = "on hold";
    }
    if (this.state == "on hold" && action != "deposit") {
        this.state = "on hold";
    }
    if (this.state == "good standing" && action == "withdraw" &&
        amount <= this.balance) {
        this.balance -= amount;
    }
    if (this.state == "good standing" && action == "withdraw" &&
        amount >this.balance) {
        this.balance -= amount;
        this.state = "overdrawn";
    }
};

let op = new Operation('withdraw', 30);

console.log(op);

//State Impl
// 1. воспроизводит всю сбивающюю с толку запутанную логику
// в нескольких простых классах
// 2. Кода немного больше чем вчисленных условных операторах но это стоит того!)
// 3. Когда переходы между состояниями - сложные(комплексные), то  оборачивание 
//      их в  шаблон State - упрощение
// 4. Можно построит процесс регистрируя события последовательно - с помошю Fluent interface
// goodStandingState
// .on("withdraw")
// .when(function(manager){return manager.balance > 0;})
// .transitionTo("goodStanding")
// .when(function(manager){return mangaer.balance <=0;})
// .transitionTo("overdrawn");

function BankAccountManager() { //содержит только начальное состояние

    this.balance = 0;
    this.state = new GoodState(this);

    this.deposit = function(amount) {
        this.state.deposit(amount);
    }

    this.withdraw = function(amount) {
        this.state.withdraw(amount);
    }
    
    this.add = function(amount) {
        this.balance += amount;
    }

    this.getBalance = function() {
        return this.balance;
    }

    this.moveTo = function(newState) { //задать сост.
        this.state = newState;
    }
}

function State(opNm) {

}



function GoodState(manager) {
    this.manager = manager;

    
    this.deposit = function(amount) {
        this.manager.add(amount);
    }

    this.withdraw = function(amount) {
        if(this.manager.getBalance() < amount) {
            this.manager.moveTo(new Overdrawn(this.manager));
        }
        this.manager.add(-1 * amount);
    }
}

function  Overdrawn(manager) {
    this.manager = manager;

    
    this.deposit = function(amount) {
        this.manager.add(amount);
        if(this.manager.getBalance() > 0) {
            this.manager.moveTo(new GoodState(this.manager))
        }
    }

    this.withdraw = function(amount) {
        this.manager.moveTo(new OnHold(this.manager));
        throw new Error("Нельзя снять деньги с долгового счета");
    }
}

function OnHold(manager) {
    this.manager = manager;

    this.deposit = function(amount) {
        this.manager.add(amount);
        throw new Error("Ваш счет заморожен - обратитесь в банк!");
    }

    this.withdraw = function(amount) {
        throw new Error("Нельзя снять деньги с замороженного счета - обратитесь в банк!");
    }
}


let manager = new BankAccountManager();
manager.deposit(100);
console.log("good", manager.getBalance());
manager.withdraw(150);

console.log(manager.getBalance());
// manager.moveTo(new Overdrawn(manager));
manager.deposit(1000);

manager.withdraw(10);
console.log(manager.getBalance());
