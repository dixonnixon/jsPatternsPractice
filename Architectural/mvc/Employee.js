/**
 * MVC development
 * 
*/

//структура сущности - Model
//Компонент модели управляет данными, которые могут потребоваться приложению.
//!! отделен от отображения
//1. В плане шаблона наблюдателя является Subject`ом !!!

function Employee(name, designation, id) {
    this.name = name;
    this.designation = designation;
    this.id = id;
}

Employee.prototype.getDesignation = function() {
    return this.designation;
};

Employee.prototype.getNm = function() {
    return this.name;
};

Employee.prototype.getId = function() {
    return this.id;
};

//Вид(Отображение) используется для визуального представления текущей модели. 
//Он отображает данные на стороне пользователя.

//компонент ответственный за отображение данных о работнике!
//т.е Информацию о работнике в GUI
//должен: 1.показывать обновленные данные если произошли изменения в модели
// 2. Или если пользователь редактирует Отображение взаимодействуя с GUI
//3. Является наблюдателем(Observer`ом) Модели ???

//4. Слой который видит пользователь(клиент?) и с которым надо взаимодействовать
// редактировать/обновлять значения атрибутов модели

function EmployeeView() {
    this.controller = null;
    this.$container = $('div#employee');

    this.$name = this.$container.find('output#name');
    this.$designation = this.$container.find('output#designation');
}

EmployeeView.prototype.registerWith = function(controller) { 
    this.controller = controller;
    this.controller.addView(this);
    // this.controller.addModel(this);
};


EmployeeView.prototype.printInfo = function(name, designation, id) {
    // console.log(`Emp Info basic: \nName = ${name}, \nDescr = ${designation}, \n Id = ${id}\n`);


    this.$name.val(name);
    this.$designation.val(designation);
};

EmployeeView.prototype.create = function(name, designation, id) {
    // console.log(`Emp Info basic: \nName = ${name}, \nDescr = ${designation}, \n Id = ${id}\n`);

    let $el = $(`<div id="employee">
        <form id="info">
            <fieldset form="info">
                <legend>Данные работника</legend>
                    <output id="name">${name}</output>
                    <output id="designation">${designation}</output>
            </fieldset>
        </form>
    </div>`).data("id", id);

    $('section#employees').append($el);
};

EmployeeView.prototype.clear = function() {
    $('section#employees').empty();
};

EmployeeView.prototype.hire = function(name, descr) {
    this.controller.hire(name, descr);
};

EmployeeView.prototype.editName = function(id, name) {
    this.controller.setName(id, name);
};

//Обьеденяет модель и отображение в себе
//Является Медиатором между Отображением и Моделью
//1. Принимает ввод от пользователя!!!!(click, keypress) (от модели) 
// 2. Обновляет Вид и Модель
//3. Может обновлять Вид на прямую

function EmployeeController() {
    this.model = null;
    this.view = null;
    this.employees = [];
}

EmployeeController.prototype.addView = function(view) {
    this.view = view;
};

EmployeeController.prototype.addModel = function(model) {
    this.model = model;
};

EmployeeController.prototype.setName = function(id, name) {
    console.log(this, this.employees[id]);
    if(this.employees[id]) {
        this.employees[id].name = name;
        this.updateView();
        // return this.employees[id]
    } 
    else 
    {
        console.log("incorrect Id");
    }
};

EmployeeController.prototype.clear = function() {
    this.view.clear();
};

EmployeeController.prototype.updateView = function() {
    console.log("Controller updateView", this);
    //using View as a Context of a map funciton
    this.clear();
    this.employees.map(function(el, i, emps) {
        // console.log("View: ", el);
        // this.printInfo(el.getNm(), el.getDesignation(), el.getId()); 
        // if(emps[el.getId()]) {

        // } else {
            this.create(el.getNm(), el.getDesignation(), el.getId());
        // }
    }, this.view);
    console.log("\n----------------------\n");
};

EmployeeController.prototype.hire = function(name, descr) {
    this.employees.push(new Employee(name, descr, this.employees.length));
    this.updateView();
};






