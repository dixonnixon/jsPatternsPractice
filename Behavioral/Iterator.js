//Изолирует то как обход происходит в итерации
//
//graphs or trees


function Iterator(elements) {
    this.index = 0;
    this.elements = elements;
}

//возвращает следующий єлемент
Iterator.prototype.next = function() {
    return this.elements[this.index++];
}

Iterator.prototype.hasNext = function() {
    return  this.index <= this.elements.length;
}

Iterator.prototype.first = function() {
    this.index = 0;
    return this.next();
}

//способ обхода спрятан в итераторе
Iterator.prototype.each = function (func) {
    for(var i = this.first(); this.hasNext(); i = this.next()) {
        func(i);
    }
}



function iterate() {
    var items = ['Yello', 'Green', 'Blue', { prop: "BLA"}]
    var iter = new Iterator(items);
    iter.each(function(item) {
        console.log(item);
    });
    // for(var i=iter.first(); iter.hasNext(); i=iter.next()){
    //     console.log(i)
    // }
}

iterate()



//Challenge Пример: Хэш-привязка(хэш-карта)

class ReverseIterator {
    constructor(elements) {
        this.keys = Object.keys(elements) //определить ключи как пронумерованый массив
        this.index = this.keys.length - 1 //определить длину массива в виде индекса
        this.elements = elements //задать сам итерируемый объект: Хеш таблицу
     }
  
    hasprevElement() { //определить существование предыдущего ел.-а как неотьемлимая длинна
      return this.index >=0 
    }
  
    last(){ //сбрасить на конец обхода объекта
        this.index = this.keys.length - 1 //задать индекс на конец ключей
        return this.elements[this.keys[this.index]] //вернуть последний значение обходного объекта
    }
  
    previous(){
      if(this.hasprevElement()){
        return  this.elements[this.keys[this.index -= 1]]	  	//сначение хеша определяется по массиву его ключей до 0 индекса
      }else{
        return null
      }
      
    }
  }
  //Вобщем фишка в том что использовать ключи объекта как массив
  
  
function reverseIterate(items){
    var iter = new ReverseIterator(items)

    for(var i = iter.last();iter.hasprevElement(); i = iter.previous()) { //использовать цикл для работы с итератором
        console.log(i)
    }	    
}

reverseIterate({
    'name': 'Anne', 
    'age': '23', 
    'gender': 'Female', 
    'Occupation': 'Engineer'
});


//Fibbonacci Iterator example
//рассмотреть как обходить множество с .. по
//Можно использовать при создании нефиксированной коллекции: как множество Фибоначчи
var FibonacciIterator = (function () {

    function FibonacciIterator(count) {
        this.count = count;
        this.previous = 1;
        this.beforePrevious = 1;
    }
    
    FibonacciIterator.prototype.next = function (current) {
        this.beforePrevious = this.previous;
        this.previous = current;
        return current;
    };
    // FibonacciIterator.prototype.next = function () {
    //     var current = this.previous + this.beforePrevious;
    //     this.beforePrevious = this.previous;
    //     this.previous = current;
    //     return current;
    // };

    // FibonacciIterator.prototype.over = function(func) {
    //     for(var i = 1; i < this.count; i+=1) {
    //         func(this.next());
    //     }
    // };
    FibonacciIterator.prototype.over = function(func) {
        for(var i = 1; i < this.count; i+=1) {
            func(this.next(this.previous + this.beforePrevious));
        }
    };
    return FibonacciIterator;
})();

var fib = new FibonacciIterator(8)
fib.over((el) => console.log(el));
// console.log(fib.next()); //2
// console.log(fib.next()); //3
// console.log(fib.next()); //5
// console.log(fib.next()); //8
// console.log(fib.next()); //13
// console.log(fib.next()); //21