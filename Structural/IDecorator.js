var Interface = require('./Interface');
var extend = require('./extend');


var Macbook = new Interface('Macbook', ['addEngraving', 'addParallels', 'add4GBRam', 'add8GBRam', 'addCase']);

var MacbookPro = function() {
    // implements Macbook
}

MacbookPro.prototype = {
    addEngraving: function () {
    
    },
    addParallels: function () {
    
    },
    add4GBRam: function () {
    
    },
    add8GBRam: function () {
    
    },
    addCase: function () {
    
    },
    getPrise: function () {
        return 900.00; //base price
    },
};

var MacbookDecor = function (macbook) {
    Interface.ensureImplements(macbook, Macbook);
    this.macbook = macbook;
};

MacbookDecor.prototype = {
    addEngraving: function () {
        return this.macbook.addEngraving();
    },
    addParallels: function () {
        return this.macbook.addParallels();
    },
    add4GBRam: function () {
        return this.macbook.add4GBRam();
    },
    add8GBRam: function () {
        return this.macbook.add8GBRam();
    },
    addCase: function () {
        return this.macbook.addCase();
    },
    getPrise: function () {
        return this.macbook.getPrise();
    }
};

let CaseDecorator = function(macbook) {
    MacbookDecor.call(this, macbook);
};

extend(CaseDecorator, MacbookDecor);

CaseDecorator.prototype.addCase = function () {
    return this.macbook.addCase() + " Adding case to macbook ";
}

CaseDecorator.prototype.getPrise = function () {
    return this.macbook.getPrise() + 45;
}

let myMac = new MacbookPro();
console.log(myMac, myMac.getPrise());

myMac = new CaseDecorator(myMac);
console.log(myMac, myMac.getPrise());