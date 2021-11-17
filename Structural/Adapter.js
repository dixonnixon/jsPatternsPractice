//исп.: 
//1. Когда API изменно или добавлена новые реализации. Часть системы использует старые API 
//а часть преобразует адаптер чтоб обе части могли работать вместк

const Interface = require("./Interface")

//2. $('.container').css({ opacity: .5 }); - єто тоже адаптер для установки opacity для всех браузеров
class SimpleEarphones{
    constructor(){
      this.attach = function(){
      console.log("Use Earphones with Type C phone")
    }
    }
    
  }
  
  class EarPhoneAdapter extends SimpleEarphones {
    constructor(typeCphone){
      super()
      this.attach = function(){
        typeCphone.attach()
      }
    }
  }
  
  class TypeCPhone {
    constructor(){
      this.attach = function(){
       console.log("Earphpnes attached to Type C phone")
    }
    } 
  }
  
  var typeCphone = new TypeCPhone()
  var adapter = new EarPhoneAdapter(typeCphone)
  adapter.attach();

  //cheelnge

  //Класс для просчета хода и вывода Имени участника игры
  class TruthAndDare {
    constructor(){
      //0||1  + 1 => 1 || 2
      this.turn = Math.floor(Math.random() * 2) + 1;
      console.log(this.turn);
    }

    //Подмена выбора после инициализации
    Getturn(){
      if(this.turn == 1){
        this.turn = 2
      }else{
        this.turn = 1
      }
      return this.turn
    }

    playGame(playerOnename,playerTwoname){
      if(this.Getturn() == 1){
        return`${playerOnename}'s turn`
      }else{
        return `${playerTwoname}'s turn`
      }
    }
  }

  //Появился новый алгоритм для просчета хода зависящий от входящего значения
  class NewTruthAndDare {
    constructor(randomValue) {
        this.turn = randomValue;
    }
  
    newplayGame(playerOnename,playerTwoname){
       //write-your-code-here
       if(this.turn %2 == 0){
        return`${playerOnename}'s turn`
      }else{
        return `${playerTwoname}'s turn`
      }
    }
  }
  


// Adapter Class
//Оборачиваем новый алгоритм в Адаптер, чтоб использовать метод того же интерфейса???
class Adapter {
    constructor(randomValue){
      //write-your-code-here
      this.newGame = new NewTruthAndDare(randomValue);
    }

    playGame(playerOnename,playerTwoname) {
        return this.newGame.newplayGame(playerOnename,playerTwoname)
    }
}
const obj = new TruthAndDare();
console.log(obj.playGame("Ross","Chandler"));
const adapt = new Adapter(7); 
console.log(adapt.playGame("Ross","Chandler"));




