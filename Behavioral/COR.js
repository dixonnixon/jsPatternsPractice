//Client.request------recieved by--------*Objects
//Создает цепь Низко связанных обьектов при получении 
//запроса либо обрабатывают его либо передают слудующему

//Позволяет запросу посланного клиентом быть полученным более чем одним объектом
//СLient------send----->Request-------Ch1?---->doThis
//                                      |
//                                      |
//                                      Ch2?--->doThis
//                                      |
//                                      |
//                                      Ch3?--->doThis etc...


//bubbling in DOM.

//Вообщем если надо чтото раздавать и классифицировать можно тоже))))
//и да, распределять выходит чтото можно))))
class HandlerChain
{
    // setNext(next) {}
    //Если не выполняется условие то вызывается этот метод
    processMultiple(req) {
        console.log("No multiple for:" + req.getMultiple());
    }
}

class Multiple
{
    constructor(multiple) {
        this.multiple = multiple;
    }

    getMultiple() {
        return this.multiple;
    }
}

class MultipleofTwoHandler extends HandlerChain
{
    constructor() {
        super();
        // this.next = new HandlerChain();
    }

    setNext(next) {
        this.next = next;
    }

    processMultiple(req) {
        if(req.getMultiple() % 2 == 0) {
            console.log("Multiple of 2: " + req.getMultiple());
        }
        else
        {
            this.next.processMultiple(req);
        }
    }
}

class MultipleofThreeHandler extends HandlerChain 
{ 
  constructor(){
    super()
    // this.next = new HandlerChain()
  } 
  
   setNext(next){ 
    this.next = next; 
  } 
  
  processMultiple(req) 
  { 
    if ((req.getMultiple() % 3) == 0) { 
      console.log("Multiple of 3: " + req.getMultiple()); 
    }else{ 
          this.next.processMultiple(req); 
        } 
    } 
}

class MultipleofFiveHandler extends HandlerChain 
{ 
  constructor() {
    super()
    this.next = new HandlerChain() //эта переменная может быть зада не обязательно во всех классах цепи!
    //при всех заданных условиях
  } 
  
   setNext(next) { 
    this.next = next; 
  } 
  
  processMultiple(req) 
  { 
    if ((req.getMultiple() % 5) == 0) { 
      console.log("Multiple of 3: " + req.getMultiple()); 
    }else{ 
          this.next.processMultiple(req); 
        } 
    } 
}

//configuring the chain of handler objects
var c1 = new MultipleofTwoHandler(); 
var c2 = new MultipleofThreeHandler(); 
var c3 = new MultipleofFiveHandler(); 
c1.setNext(c2); 
c2.setNext(c3); 

//the chain handling different cases
c1.processMultiple(new Multiple(95)); 
c1.processMultiple(new Multiple(50)); 
c1.processMultiple(new Multiple(9)); 
c1.processMultiple(new Multiple(4)); 
c1.processMultiple(new Multiple(21));
c1.processMultiple(new Multiple(23)); 

//Chellange

//назначение работы сотрудникам
//employee { 
// name, 
// level: <task difficulty>  [easy, med , hard]
// } => Employee.task <rel> level

function Employee(name, level) {
  this.name = name;
  this.level = level;

  this.getLevel = function () {
    return this.level;
  }
  
  this.getName = function () {
    return this.name;
  }

  this.setJob = function (job) {
    this.job = job;
  }
}

function EmployeeChain() {
    
    this.setNextEmp = function (emp) {}
    this.assignWork = function (req) {
      // console.log("Non Classified  " 
      //   + " work assigned to: " + req.getName());
    }
} 


function EasyLevelWorkHandler(easyJobList) {

  this.list = easyJobList;

  this.setNextEmp = function (emp) {
    this.next = emp;
  }

  this.setJob = function(req) {
    req.setJob(this.list.pop());
  }

  this.assignWork = function (req) {
    if(req.getLevel() === "Easy") {
      console.log(req.getLevel() 
        + " work assigned to: " + req.getName());
      
        this.setJob(req);
    }
    else
    {
      this.next.assignWork(req); 
    }
  }

}

//Рясшряет  класс и дает работнику легкую работу отсортировав по приоритету
//

function EasyLevelWorkHandlerPriority(easyJobList) {

  EasyLevelWorkHandler.call(this, easyJobList);

  this.setJob = function(req) {
    let lst = this.list.filter(function(el) {
      return parseInt(el.priority) >= 5;
    }).sort((a, b) => (parseInt(a.priority) < parseInt(b.priority)) ? 1 : -1);


    console.log("List", lst);
    this.list = lst;
    req.setJob( this.list.pop() );
  }
}




function MediumLevelWorkHandler() {
  this.setNextEmp = function (emp) {
    this.next = emp;
  }

  this.assignWork = function (req) {
    if(req.getLevel() === "Medium") {
      console.log(req.getLevel() 
        + " work assigned to: " + req.getName());
    }
    else
    {
      this.next.assignWork(req); 
    }
  }

}

function HardLevelWorkHandler() {
  this.next = new EmployeeChain();

  this.setNextEmp = function (emp) {
    this.next = emp;
  }

  this.assignWork = function (req) {
    if(req.getLevel() === "Hard") {
      console.log(req.getLevel() 
        + " work assigned to: " + req.getName());
    }
    else
    {
      this.next.assignWork(req); 
    }
  }

}

// EmployeeChain.prototype = new EmpChainComplete();
let extend = new EmployeeChain ();
EasyLevelWorkHandler.prototype    =  extend;
MediumLevelWorkHandler.prototype  =  extend;
HardLevelWorkHandler.prototype    =  extend;

let easyWork = [
  { goal: "DoThisA", name: "Job1", time: new Date(), priority: "10" },
  { goal: "DoThisA", name: "Job1", time: new Date(), priority: "5" },
  { goal: "DoThisA", name: "Job1", time: new Date(), priority: "6" },
  { goal: "DoThisA", name: "Job1", time: new Date(), priority: "1" },
];

let w1 = new EasyLevelWorkHandlerPriority(easyWork);
let w2 = new EasyLevelWorkHandler(easyWork);
let w3 = new MediumLevelWorkHandler();
let w4 = new HardLevelWorkHandler();

w1.setNextEmp(w2);
w2.setNextEmp(w3);
w3.setNextEmp(w4);

const wrkrs = [
  {  name: "Joe", level: "Easy" },
  {  name: "Anne", level: "Medium" },
  {  name: "Shawn", level: "Hard" },
  {  name: "Shawn2", level: "Easy" },
  {  name: "Shawn3", level: "Hard234" },
  {  name: "Shawn4", level: "Medium" },
  {  name: "JoeListener", level: "Easy" },
];

let employees = wrkrs.map(function(el) {
  return new Employee(el.name, el.level);
});

employees.forEach(function(el) {
  w1.assignWork(el); 
});

console.log(employees);



// , { goal: "DoThisA", name: "Job1", time: new Date() }
// , { goal: "DoThat", name: "Job2", time: new Date()  }
// , { goal: "DoThisB", name: "Job3", time: new Date() }

