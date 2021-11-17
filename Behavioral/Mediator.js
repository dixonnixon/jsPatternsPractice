//ChatBox Mediator
//Использовать: 1.Когда в системе много частей которые общаются
//2. Во избежания сильного сцепления
//3. Улучшить читаемость кода
//4. Если общение между объектами сложное и мешает переиспользованию кода

//Польз. - Колеега так сказать
function User(name, id) {
    this.name = name;
    this.id = id;
    this.chat = null; // mediator
}
//Может отсылать кому то сообщения
User.prototype.sendMessage = function(message, sendTo) { 
    this.chat.send(message, this, sendTo);
}
//Принимать от кого то сообщениЯ
User.prototype.recieveMessage = function(message, recieveFrom) {
    console.log(`${recieveFrom.name} sent the message: ${message}`);
}

function ChatBox() {
    this.users = [];
}

ChatBox.prototype.register = function(user) {
    this.users[user.id] = user;
    user.chat = this; 
}

//Отсылает сообщение от кого к кому
ChatBox.prototype.send = function(message, recieveFrom, sendTo) {
    sendTo.recieveMessage(message, recieveFrom);
}

let chat = new ChatBox();

let joey = new User("Joey", 1);
let user2 = new User("Andrie", 2);

chat.register(joey);
chat.register(user2);

joey.sendMessage("Hey, how you doing?",user2);
user2.sendMessage("Smelly Cat, Smelly Cat..",joey);
joey.sendMessage("I love this song!", user2);

//Chellange

//HR hat mediates comm between employees an Managers
function HR() {
    this.employees = [];
    this.registerEmployee = function(employee) {
        this.employees[employee] = employee;
    }

    this.scheduleRaise = function(raise, worker, manager) {
        manager.recieveMessage(worker, raise);
        if(manager.approveRaise(worker, raise)) {
            worker.recieveRaise(raise);
        }; 
    }
}

function Employee(hr, name, type, raise) {
    this.hr = hr;
    this.name = name;
    this.type = type;
    this.raise = raise;

    this.register = function() {
        this.hr.registerEmployee(this);
    };

    this.register();
}



function Manager(hr, name, type, raise) {
    Employee.apply(this, [hr, name, type, raise]);
    

    this.recieveMessage = function(worker, raise) {
        console.log(`${worker.name} should get ${raise} dollar raise`);
    };  

    this.approveRaise = function(worker, raise) {
        console.log(`${worker.name}'s ${raise} dollar raise is approved`);
        return true;
    };  
}

function Worker(hr, name, type, raise) {
    Employee.apply(this, [hr, name, type, raise]);
   

    this.recieveRaise = function(raise) {
        this.raise +=  raise;
        console.log(`My new pay is ${this.raise} dollars`);
    };
}

var hr = new HR();
let employee = new Worker(hr,"Joe","Developer",1400);
let manager = new Manager(hr, "Allen","Team Lead",3000);

hr.scheduleRaise(200, employee, manager);