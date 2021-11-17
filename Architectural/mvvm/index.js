//M -хранит данные и не знает как они отображаются
// V - содержит поведение, принимает ввод от пользователя, 
    // Ободражают инф-ю без знания модели - пассивы - содержаться в контроллере
    // Содержит: привязки, события поведение  - требуют модель
//VM - как и Контроллер. Обновляет Модель. Сообщает комманды из
    //вида в модель. Поддерживает Состояние Вида и вызывает
    //на нем события))))))!!!!!

//V&VM - общаются через события. привязки, методы.
//Вид привязывет события через команды
//VM - раскрывает свойства модели, обновляемую Видом
    //через двунаправленную связку данных


//MODEL
class Model{
	constructor(){
		this.model  = {name : "Stuart"};
		this.observers = [];
	}
	subscribe(observer){
		this.observers.push(observer);
	}
	notifyObservers(attrName, newVal){
		for(var i = 0; i < this.observers.length; i++){
			this.observers[i](attrName, newVal);
		}
	}
	getCurrentName(nameKey){
		console.log(this.model[nameKey]);
		return this.model[nameKey];
	}
	
	setNameValue(nameKey, value){
		this.model[nameKey] = value;
		this.notifyObservers(nameKey, value);
	}
}


//VIEWMODEL  
class ViewModel {
	constructor(model){
		this.bind = function(viewElement, modelElement){
		    viewElement.value = model.getCurrentName(modelElement);
			model.subscribe(function(attrName, newValue){
				document.getElementsByName(attrName).forEach(function(elem){
					elem.value = newValue.toUpperCase();
				});
			});
			viewElement.addEventListener('input', function(){
				model.setNameValue(viewElement.name, viewElement.value);
		});
	  }
	}
}

function View() {

}

//VIEW
var nameInput = document.getElementById('name');
var nameCopy = document.getElementById('nameCopy');
var model = new Model()
var viewModel = new ViewModel(model);
viewModel.bind(nameInput, 'name');
viewModel.bind(nameCopy, 'name');


//Chellenge


class ColorModel extends Model {
	constructor() {
        super(); 
		this.model  = {color: "red"};
	}
	
}

class ColorViewModel {
	constructor(model){
		this.bind = function(viewElement, modelElement){
		    viewElement.value = model.getCurrentName(modelElement);
            if(viewElement.value == 'red') {
                viewElement.style.color = "red";
            }

			model.subscribe(function(attrName, newValue){
				document.getElementsByName(attrName).forEach(function(elem){
                    if(elem.value == 'red') {
                        elem.style.color = "red";
                        viewElement.style.color = "red";
                    }
					if(elem.value == 'green') {
                        elem.style.color = "green";
                        viewElement.style.color = "green";
                    }
                    if(elem.value == 'blue') {
                        elem.style.color = "blue";
                        viewElement.style.color = "blue";
                    }
                    elem.value = newValue;
				});
			});
			viewElement.addEventListener('input', function(){
				model.setNameValue(viewElement.name, viewElement.value);
		});
	  }
	}
}


var nameInput = document.getElementById('color');
var target = document.getElementById('clr');

var model = new ColorModel()
var viewModel = new ColorViewModel(model);
viewModel.bind(nameInput, 'color');
viewModel.bind(target, 'color');
