//Использовать ПРИ:
//настройка об'екта требует высокоуровневой сложности
//генерировать разные обЪекты полагаясь на окружение
//при работе с множеством объектов разделяющих общие характеристики (прототип)
//для соеденения/композиции классов с обьектам других классов которые  нужны лишь для API contract (duck typing)

//НЕ использовать ПРИ:
//усложняются тесты
//Abstract Factory см ниже
function Button(text, width, height, id, cssClass) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.id = id;
    this.cssClass = cssClass;

}

function Href(text, link) {
    this.text = text;
    this.link = link;
}

Href.prototype.render = function() {
    return `<a type="button" href="${this.link}">${this.text}</a>`;
};

Button.prototype.render = function() {
    return `<button class="${this.cssClass}" id="${this.id}" style="width:${this.width};height:${this.height}">${this.text}</button>`;
};

function ButtonFactory() {}

ButtonFactory.prototype.buttonClass = Button;

ButtonFactory.prototype.getButton = function(options) {
    return new this.buttonClass(options.text, options.width, options.height, options.id, options.cssClass);
}

//-------------

let buttonIns = new Button("Hi", 200, 300, "setMe", "setMe");
let butFacIns = new ButtonFactory();

let buttonMe = butFacIns.getButton({
    text: "Me",
    width: 30,
    height: 20,
    id: "setMe",
    cssClass: "setMe"
});

console.log(buttonIns.render());
console.log(buttonMe.render());

//---- WAY1: modify factory instance class
butFacIns.buttonClass = Href;
//when  construct changed it needs to change factory method
butFacIns.getButton = function(options) {
    return new this.buttonClass(options.text, options.link);
}

let herfBut = butFacIns.getButton({
    text: "LinkMe",
    link: "http://localhost"
});

console.log(herfBut.render());

//=------
//WAY2: factorySubclass
function HrefFactory() {}
HrefFactory.prototype = new ButtonFactory();
HrefFactory.prototype.buttonClass = Href;
HrefFactory.prototype.getButton = function(options) {
    return new this.buttonClass(options.text, options.link);
}


let hrefButFac = new HrefFactory();
let aHrefBut = hrefButFac.getButton({
    text: "LinkMe",
    link: "http://localhost"
}); 
console.log(aHrefBut.render());
//=------
console.log("\r\n=------\r\n");
//AbstractFactory
//ЦЕЛЬ: спрятать группу  отдельных фабрик с общим назначением
//Отделяет детали реализации набора объектов от их общего использования
//Пример: регистрация типов кнопок, Разрешение определения типов кнопок "button", "href" и отдельных
//фабрик реализующих только классы отвечающие соглашению кнопок напр, render, breakDown, hide?

//имеет смісл только если при создании объектов передается набор параметров объектом
//иначе прийдется использовать условный оператор при получении продука фабрики

function AbsButton(opts) {
    this.text = opts.text;
    this.width = opts.width;
    this.height = opts.height;
    this.id = opts.id;
    this.cssClass = opts.cssClass;
}

function AbsHref(opts) {
    this.text = opts.text;
    this.link = opts.link;
}

AbsHref.prototype = new Href({});
AbsButton.prototype = new Button({});

let AbsButtonFac = (function() {
    var types = {};
    return {
        get: function(type, cust) {
            let Button = types[type];

            return (Button) ?  new Button(cust) : null;
        },
        register: function(type, Button) {
            let proto = Button.prototype;

            if(proto.render && proto.hide)
                types[type] = Button;
            return AbsButtonFac;
        }
    };
})();

AbsHref.prototype.hide = function() {
    this.render = () =>  "";
};
AbsButton.prototype.hide = AbsHref.prototype.hide;

AbsButtonFac.register("button", AbsButton);
AbsButtonFac.register("href", AbsHref);

var specButton = AbsButtonFac.get("button", {
    text: "Me",
    width: 30,
    height: 20,
    id: "setMe",
    cssClass: "setMe"
});

var specHref = AbsButtonFac.get("href", {
    text: "LinkMe",
    link: "http://localhost"
});

console.log(specButton.render());
console.log(specHref.render());

specButton.hide();
specHref.hide();

console.log(specButton.render(), typeof specButton.render(), specButton.render().length);
console.log(specHref.render(), typeof specHref.render(), specHref.render().length);



//=-------------------
//main task
function ToyFactory() {
    this.toy = ToyDuck;
    this.createToy = function(toyChosen) {
        if (toyChosen.toyType == "duck") {
            this.toy = ToyDuck;
        } else if (toyChosen.toyType == "car") {
            this.toy = ToyCar;
        }
        return new this.toy(toyChosen);
    }
}

function ToyDuck(toyObj) {
    this.color = toyObj.color;
    this.price = toyObj.price;
}

function ToyCar(toyObj) {
    this.color = toyObj.color;
    this.price = toyObj.price;
    this.name = toyObj.name;
}

