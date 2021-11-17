 
 //Позволяет 2 классам с разными интерфейсами работать вместе
 //пример.: AC - кондиционеры, RC - пульты к ним

 //1. Когда нужно расширить класс в нескольких независимых измерениях
 //2. Изменение реализации во время выполнения
 //3. Разделять реализацию между объектами
 class SimpleRemoteCtrl {
     constructor(ac) {
         this.ac = ac;

         this.on = function() {
             this.ac.on();
         }
         
         this.off = function() {
             this.ac.off();
         }

         this.setTemp = function(temp) {
             this.ac.setTemperature(temp);
         }
     }
 };

 class InvertorRemoteControl {
    constructor(ac) {
        this.ac = ac;

        this.heat = function() {
            this.ac.heatOn();
        };

        this.cold = function() {
            this.ac.coldOn();
          };
        
        this.off = function() {
            this.ac.off();
        };

        this.on = function() {
            this.ac.on();
        };

        this.setTemp = function(temp) {
            this.ac.setTemperature(temp);
        }
    }
};

//simpleAC
class SimpleAC {
    constructor() {
        this.on = () => console.log('Simple AC is on');
        this.off = () => console.log('Simple AC is off');
        this.setTemperature = (temp) => console.log(`Simple AC's cooling is set to ` + temp + ' degrees');
    }
}

class InvertorAC {
    constructor() {
        this.setting = "cool";
        this.on =  () => console.log('Inverter AC is on');
        this.off =  () => console.log('Inverter AC is off');
        this.heatOn =  function() {
            this.setting = "heat";
            console.log('Inverter AC\'s heating is on');
        }

        this.coldOn =  function() {
            this.setting = "cool";
            console.log('Inverter AC\'s cooling is on');
        }

        this.setTemperature = function(temp) {
            if(this.setting === "cool") {
                console.log(`Invertor AC's cooling is set to ` + temp + ' degrees');
            }
            if(this.setting === "heat") {
                console.log(`Invertor AC's heating is set to ` + temp + ' degrees');
            }
        }
    }
}


const simpleAC = new SimpleAC();
const simpleRemote = new SimpleRemoteCtrl(simpleAC)

simpleRemote.on()
simpleRemote.setTemp(16)
simpleRemote.off()

const invertAC = new InvertorAC();
const invertRemote = new InvertorRemoteControl(invertAC)

invertRemote.on();
invertRemote.heat();
invertRemote.setTemp(16);
invertRemote.cold(16);
invertRemote.setTemp(-16);
invertRemote.off();

//challenge


class Applications {
    constructor(name, type){
        this.name = name
        this.type = type
    }
    display(){}
    displayMode(){
        console.log(`You are using ${this.name} in ${this.mode} mode`);
    }
}

class FacebookLightMode extends Applications{
    constructor(name,type){
        super(name,type)
    }
    display(){
        console.log(`Welcome to Facebook for ${this.type}.`)
    }
    displayMode(){
        console.log("You are using facebook in light mode.")
    }
}

class FacebookDarkMode extends Applications{
    constructor(name,type){
        super(name,type)
    }
    display(){
        console.log(`Welcome to Facebook for ${this.type}.`)
    }
    displayMode(){
        console.log("You are using facebook in dark mode.")
    }
}

class WhatsAppLightMode extends Applications{
    constructor(name,type){
        super(name,type)
    }
    display(){
        console.log(`Welcome to Whatsapp for ${this.type}.`)
    }
    displayMode(){
        console.log("You are using whatsapp in light mode.")
    }    
}

class WhatsAppDarkMode extends Applications{
    constructor(name,type){
        super(name,type)
    }
    display(){
        console.log(`Welcome to Whatsapp for ${this.type}.`)
    }
    displayMode(){
        console.log("You are using whatsapp in dark mode.")
    }    
}

class Facebook extends Applications {
    setDarkMode() {
        this.mode = "dark";
    }
    setLightMode() {
        this.mode = "light";
    }
    display() {
        console.log(`Welcome to Facebook for ${this.type}.`)
    }
}

class WhatsApp  extends Applications {
    constructor(name,type){
        super(name,type)
    }

    setDarkMode() {
        this.mode = "dark";
    }
    setLightMode() {
        this.mode = "light";
    }

    display() {
        console.log(`Welcome to WhatsApp for ${this.type}.`)
    }
}


//Важно чтоб єлемент вызывал метод моста
//но с другой стороны хранить все режимы тут - меньше кода
class Mode {
    constructor(app) {
        this.app = app;

        this.darkMode = function() {
            this.app.setDarkMode();
        }
        this.lightMode = function() {
            this.app.setLightMode();
        }
    }
}

// const fbLight = new FacebookLightMode("Facebook", "Social Networking")
// const whatsappDark = new WhatsAppDarkMode("Whatsapp", "Chatting")
// fbLight.display()
// fbLight.displayMode()
// whatsappDark.display()
// whatsappDark.displayMode()

const fb = new Facebook("Facebook", "Social Networking")
const mode = new Mode(fb)

mode.darkMode()
fb.displayMode() 

mode.lightMode()
fb.displayMode() 

const wsUp = new WhatsApp("WhatsApp", "Catting")
const mode1 = new Mode(wsUp)

mode1.darkMode()
wsUp.displayMode() 

mode1.lightMode()
wsUp.displayMode() 



//Challengfe worship gods)

//1. Many people - many different religions
//2. Each religion - own way of [praying(), making offerings()]
//3. We want to hide complex logic of making correct prayers

function PrayerPurposeProvider() {

}

PrayerPurposeProvider.prototype.GetPurpose = function() {
    return "My purpose is sheet!"
}

function Sacrifice() {}

function HumanSacrifice() {}


const Religion = {};

const OldGods = (function () { //модуль мозвращает конструктор 
    function OldGods() {}
    OldGods.prototype.prayTo = function (sacrifice) {
        console.log("We Old Gods hear your prayer");
        };
    return OldGods;
})();



const DrownedGod = (function () { //модуль мозвращает конструктор
    function DrownedGod() {}
    DrownedGod.prototype.prayTo = function (humanSacrifice) {
        console.log("*BUBBLE* GURGLE");
    };
    return DrownedGod;
})();


const SevenGods = (function () {
    function SevenGods() {}
    SevenGods.prototype.prayTo = function (prayerPurpose) {
        console.log(`Sorry there are a lot of us, it gets confusing
        here. Did you pray for something?`);
    };
    return SevenGods;
})();

const OldGodsAdapter = (function () {
    function OldGodsAdapter() {
        this._oldGods = new OldGods();
    }
    OldGodsAdapter.prototype.prayTo = function () {
        var sacrifice = new Sacrifice();
        this._oldGods.prayTo(sacrifice);
    };
    return OldGodsAdapter;
})();

var DrownedGodAdapter = (function () {
    function DrownedGodAdapter() {
        this._drownedGod = new DrownedGod();
    }
    DrownedGodAdapter.prototype.prayTo = function () {
        var sacrifice = new HumanSacrifice();
        this._drownedGod.prayTo(sacrifice);
    };
    return DrownedGodAdapter;
})();

var SevenGodsAdapter = (function () {
    function SevenGodsAdapter() {
        this.prayerPurposeProvider = new PrayerPurposeProvider();
        this._sevenGods = new SevenGods();
    }
    SevenGodsAdapter.prototype.prayTo = function () {
        this._sevenGods.prayTo(this.prayerPurposeProvider.GetPurpose());
    };
    return SevenGodsAdapter;
})();


Religion.OldGods = OldGods;
Religion.DrownedGod = DrownedGod;
Religion.SevenGods = SevenGods;


Religion.OldGodsAdapter = OldGodsAdapter;
Religion.DrownedGodAdapter = DrownedGodAdapter;
Religion.SevenGodsAdapter = SevenGodsAdapter;

var god1 = new Religion.SevenGodsAdapter();
var god2 = new Religion.DrownedGodAdapter();
var god3 = new Religion.OldGodsAdapter();
var gods = [god1, god2, god3];

for(var i = 0; i < gods.length; i += 1){
    gods[i].prayTo();
}



