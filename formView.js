//считывать Интерфейс и передавать данные в модель
//создавать события, добавлять обработчики 
function FormView(selector) {
    this.el = utils.el(selector);
}

FormView.prototype.initialize = function() {
    utils.html(this.el, formTemplate({}));
    this.initialize$FormView(this.el);
    this.model = { prop: null };
}; 

//добавление в модель єлементов формы
FormView.prototype.initialize$FormView = function(el) {
    this.name = utils.el('.name', el);
    this.output = utils.el('.output', el);
    this.currentTime = utils.el('.current-time', el);

    console.log(this);
};

//onInputNameRemove & onInputOutputRemove - методы для отвязки. Вызаваются при вызове методва
//отвязки
FormView.prototype.bind = function(model) {
    //model!!!!! ALARM2
    this.onInputNameRemove = utils.on(this.el, '.name', 'input', 
        () => this.onInputName());
    this.onInputOutputRemove = utils.on(this.el, '.output', 'input', 
        () => this.onInputName());
};

FormView.prototype.unBind = function() {
    utils.getResult(this, () => this.onInputNameRemove);
    utils.getResult(this, () => this.onInputOutputRemove);
};
FormView.prototype.remove = function() {};

//!!!!!!!ALARM1
//я бы сделал как в Расчетах.Формы но в туториале так
//методы полученя/установки модели
FormView.prototype.getName = function() {
    return this.name.value;
};

FormView.prototype.setName = function(val) {
    if(val !== this.name.value)
        this.name.value = val;
};

FormView.prototype.getOutput = function() {
    return this.output.value;
};

FormView.prototype.setOutput = function(val) {
    if(val !== this.output.value)
        this.name.value = val;
};

FormView.prototype.setCurrentTime = function(val) {
    if(val !== this.currentTime.innerText)
        this.currentTime.innerText = val;
};
//////////////////////////////////////

//А єто уже еще одна ось изменений
//This.model используется для связи элементов модели с ... непонятно чем)
//ALARM3
FormView.prototype.onInputName = function() {
    this.model.prop("name", this.getName());
}

FormView.prototype.onInputOutput = function() {
    this.model.prop("output", this.getOutput());
}
