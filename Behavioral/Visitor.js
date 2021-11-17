//Позволяет определять новые операции в коллекции объектов
// без исменения их структуры. Это позволяет отделять класс объекта от реализуемой им логики
//Позволяет делать будущие расширения, расширять библиотеки/фреймворки

//Использовать когда:
// 1. Одинаковые/Отдельные операции должны быть выполнены на разных объектах в структуре
//2. Расширить библиотеку

// Доп. Оп ----encapsulateInto--------->Visitor Obj
// Object.visit(Visitor obj);
// Visitor.visit(Obj) ---makeOp&performOp-------->Object

function deepCopy(p, c) {
    c = c || {};
    for (vari in p) {
        if (p.hasOwnProperty(i)) {
            if (typeof p[i] === 'object') {
                c[i] = Array.isArray(p[i]) ? [] : {};
                deepCopy(p[i], c[i]);
            } else {
            c[i] = p[i];
            }
        }
    }
    return c;
}

function extendCopy(p) {
    var c = {};
    for (vari in p) {
       c[i] = p[i];
    }
    c.uber = p;
    return c;
}

function extend2(Child, Parent) { //Copying properties
    var p = Parent.prototype;
    var c = Child.prototype;
    for (vari in p) {
        c[i] = p[i];
    }
    c.uber = p;
}

function extend(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

function Visitor() {
    this.visit = function(item) {};
};

//Операция вывода скидки для книги
function BookVisitor() {
    this.visit = function(book) {
        let cost = 0;
        if(book.getPrice() > 50) {
            cost = book.getPrice() * 0.50
        }
        else
        {
            cost = book.getPrice();
        }
        console.log(`Book name: ${book.getName()}\nID: ${book.getId()}\ncost: ${cost}`);
        return cost;
    };
}

__extends(BookVisitor, Visitor);

function Book(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;

    this.getPrice = function() {
        return this.price;
    }
        
    this.getName = function() {
        return this.name;
    }
    this.getId = function() {
        return this.id;
    }
    this.accept = function(visitor) {
        return visitor.visit(this);
    }
}

let visitor = new BookVisitor();
let book1 = new Book("#1234", "LoTr", 51);
book1.accept(visitor);

//Challenge: MusicLibrary

function RockMusicVisitor () {
    this.visit = function(musicLib) {
        // if(song.genre === "Rock")
        return musicLib.songs.filter((el) => el.genre === "Rock").map((el) => el.name);
    }
}

function Song(name, genre) {
    this.name = name;
    this.genre = genre;

    this.getName = function() {
        return this.name;
    }

    this.getGenre = function() {
        return this.genre;
    }
}

function MusicLibrary() {
    this.songs = [];
    this.accept = function(visitor) {
        return visitor.visit(this);
    }

    this.addSong = function(song) {
        this.songs.push(song);
    }
}

var rockMusicVisitor = new RockMusicVisitor();
let song1 = new Song("Bohemian Rhapsody","Rock");
let song2 = new Song("Stair way to Heaven","Rock");
let song3 = new Song("Opps I did it again", "Pop");
let song4 = new Song("Crazy", "Country");
let musicLibrary = new MusicLibrary();
musicLibrary.addSong(song1);
musicLibrary.addSong(song2);
musicLibrary.addSong(song3);
musicLibrary.addSong(song4);
console.log(musicLibrary.accept(rockMusicVisitor));