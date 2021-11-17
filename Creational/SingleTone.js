// let instance = null;
// class Printer {
//   constructor(pages) {
//     this.display= function(){
//       console.log(`You are connected to the printer. You want to print ${pages} pages.`)
//     }
//   }

//   static getInstance(numOfpages){
//     if(!instance){
//       instance = new Printer(numOfpages);
//     }
//     return instance;
//   }
// }

// var obj1 = Printer.getInstance(2)
// console.log(obj1)
// obj1.display()
// var obj2 = Printer.getInstance(68)
// console.log(obj2)
// obj2.display()
// console.log(obj2 == obj1)

//использовать когда нужно координировать действия сквозь систему одним объектом
//1. Доступ
//2. Доступ
//3. Там где надо 1 раз подключиться/авторизироваться и использовать это подключения
//    напр. Logger service
//4. Сервисы которые хранят состояние, конфигурацию, предоставляют доступ к ресурсам
//5. Configurations: ненужно создавать екземпляр каждый раз при необходимости читать конфиг по всей системе

var Printer = (function () {
    // options: an object containing configuration options for the singleton
    // e.g var options = { name: 'test', pointX: 5};
 

    function Printer(pages) {
        // set options to the options supplied or an empty object if none provided.
        this.pages = pages || 0;
    }
    // this is our instance holder
    var instance;
    // this is an emulation of static variables and methods
    var _static = {
        name: 'SingletonTester',
        // This is a method for getting an instance
        // It returns a singleton instance of a singleton object
        getInstance: function (pages) {
            if (instance === undefined) {
                instance = new Printer(pages);
            }
            return instance;
        }
    };
    return _static;
})();
    
var Obj1 = Printer.getInstance(6);
console.log(Obj1.pages, Obj1); // outputs 5
var Obj2 = Printer.getInstance(20);
console.log(Obj2.pages, Obj2); // outputs 5


// function Singleton(p) {
//   if (!Singleton._instance) {
//     this.p = p;
//     Singleton._instance = this;
//   }
  
//   //static method
//   Singleton.getInstance = function () {
//     return this._instance;
//   };  

//   return Singleton._instance;
// }

// let ob3 = new Singleton(22);
// console.log(ob3);
// let ob4 = new Singleton(333);
// console.log(ob3, ob4, ob3 === ob4, ob4._instance);



const _data = [];

const UserStore = {
  add: item => _data.push(item),
  get: id => _data.find(d => d.id === id)
}

Object.freeze(UserStore);
// export default UserStore;

let configure = null;
class ConfigureVals{
    constructor(initvalues){
        this.xpoint = initvalues.xpoint || 0;
        this.ypoint = initvalues.ypoint || 0;
        this.shape = initvalues.shape || null;
    }
    static getConfiguration(initvalues){
        if (!configure) {
            configure = new ConfigureVals(initvalues)
            }
            return configure;
    }
}

var configureObj1 = ConfigureVals.getConfiguration({ "xpoint": 8, "ypoint" : 9, "shape" : "rectangle" });
console.log(configureObj1);
var configureObj2 = ConfigureVals.getConfiguration({ "xpoint": 2, "ypoint": 4, "shape" : "circle" });
console.log(configureObj2);
configure = null;
var configureObj3 = ConfigureVals.getConfiguration({ ypoint: 4, shape : "circle" });
console.log(configureObj3);

//ES5
ConfigureVals = (function (){
  var configure;
  function initializeVals(initvalues){
      this.xpoint = initvalues.xpoint || 0;
      this.ypoint = initvalues.ypoint || 0;
      this.shape = initvalues.shape || null;
  }
  return {
    getConfiguration(initvalues) {
      if (configure == undefined) {
        configure = new initializeVals(initvalues)
      }

      return configure;
    }
  }
})()

var configureObj1 = ConfigureVals.getConfiguration({ "xpoint": 8, "ypoint" : 9, "shape" : "rectangle" });
console.log(configureObj1)
var configureObj2 = ConfigureVals.getConfiguration({ "xpoint": 2, "ypoint": 4, "shape" : "circle" });
console.log(configureObj2)
console.log(configureObj2 == configureObj1, configureObj1.configure)