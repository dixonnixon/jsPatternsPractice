function App(selector) {
    //хранить єлемент DOM в свойстве el - правило 1
    this.el = utils.el(selector);
    //больше елементов тут?
}

App.prototype.initialize = function() {
    utils.html(this.el, mainTemplate({}));
    this.initialize$App(this.el);
    this.form.initialize(); // нарисовать форму
    
    console.log(this.form.setName("hh"));
    console.log(this.form.getName());
};

//задавать свойства элемента DOM в отдельном методе инициализации ;)))))
App.prototype.initialize$App = function(el) {
    this.form = new FormView(utils.el('.form', el));
    this.modelState = utils.el('.current-time', el);
};

App.prototype.logModelState = function(model) {};
App.prototype.bind = function(formModel) {};
App.prototype.remove = function(formModel) {};

setTimeout(() => {
    const app = new App('#container');
    
    // const model = new TimerModel();
    // console.log(app);
    app.initialize();
    // app.bind(model);
});