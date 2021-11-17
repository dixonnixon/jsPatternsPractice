function GetCapital() {
    this.getMyCapital = function(country) {
        switch(country) {  
            case "Ukraine": return "Kyiv";
            case "India": return "New Delhi";
            case "Canada": return "Ottawa"; 
            case "Ukraine": return "Kyiv";
            default: return "";
        }
    }
}

function ProxyGetCapital() {
    this.capital = new GetCapital();
    this.cache = {};

    this.getMyCapital = function(country) {
        if(!this.cache[country]) {
            let value = this.capital.getMyCapital(country);
            this.cache[country] = value;
            return `${value} -- returning from Getcapital`
        } 
        else 
        {
            return `${this.cache[country]} -- returning from cache`
        }
    }
}

let capital = new ProxyGetCapital();
console.log(capital.getMyCapital("Ukraine"));
console.log(capital.getMyCapital("Ukraine"));
console.log(capital.getMyCapital("Ukraine"));

//chellenge
//Приложение Киоск по управлению уличного киоска
//Позволяет окрыть приложение в киоске или войти на сайт

//надо запретить приложение 
    // camera, photos, music, and settings
//и запретить сайты
// fb.com, instagram.com, snapchat.com, google.com, and gmail.com

function LibraryKiosk () {
    this.open = function (app) {
        console.log(`Opening ${app}`);
    };
    this.connectTo = function (web) {
        console.log(`Connecting to ${web}`);
    };
}




function InvokeKiosk() {
    this.open = function (app) {
        console.log(`You can't access the ${app}`);
    };
    this.connectTo = function (web) {
        console.log(`Access to ${web} denied`);
    };
}


function createLibraryKiosk(check) {
    if(check)
        return new LibraryKiosk(); 
    else return new InvokeKiosk();
}




function ProxyLibraryKiosk() {
    // this.kiosk = new LibraryKiosk();
    
    this.ignoreList = {
        app: ["camera", "photos", "music", "settings"],
        web: ["fb.com", "instagram.com", "snapchat.com", "google.com", "gmail.com"]
    };

    this.open = function(app) {
        // if(this.ignoreList.app.find((el) => el === app))
        if(this.check("app", app))
            console.log(`You can't access the ${app}`)
        else this.kiosk.open(app);
    }

    this.connectTo = function(web) {
        if(this.check("web", web))
            console.log(`Access to ${web} denied`)
        else this.kiosk.connectTo(web);
    }

    this.check = function (type, name) {
        return this.ignoreList[type].includes(name);
    }

    //let chooseMethod   //Bridge???
    //тут можно зарефакторить поиск в списке, выбор функции и сообщение в отдельную функцию
}

let kioskLib = new LibraryKiosk();
kioskLib.open("photos");
kioskLib.open("settings");
kioskLib.open("chrome");
kioskLib.connectTo("fb.com");

var libraryKiosk = new ProxyLibraryKiosk(); 
libraryKiosk.open("photos")
libraryKiosk.open("music")
libraryKiosk.open("Chrome")
libraryKiosk.connectTo("booksportal.com"); 
libraryKiosk.connectTo("google.com"); 
libraryKiosk.connectTo("fb.com"); 

//success