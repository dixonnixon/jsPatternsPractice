function View(ctrl) {

    this.controller = ctrl;
    this.heading = $('#heading');
    this.heading.html(this.controller.getHeading());
    this.heading.on('click', this.controller.on);

    this.update = function(data) {
        this.heading.html(data);
    }
    this.controller.model.register(this);
}

function Model() {
    let self = this;

    let state =  new HeadingState();

    var heading = state.getValue();
    this.observers = [];
    this.register = function (observer) {
        self.observers.push(observer);
    }

    this.notify = function () {
        self.observers.forEach(function (observer) {
            observer.update(self.heading); //???self
        });
    }

    this.changeHeading = function() {
        state.changeState();
        self.heading = state.getValue();
    }

    Object.defineProperty(this, 'heading', {
        get: () => { console.log("Model get Triggered!)"); return heading; } ,
        set: (val) => { heading = val; this.notify(); }
    });
}

function Controller(model) {
    this.model = model;
    let self = this;

    this.on = function(e) {
        e.preventDefault();
        switch(e.type) {
            case "click":
                self.clickHandler( e.target);
                break;
        }
    }

    this.getHeading = function () {
        return this.model.heading;
    }

    this.clickHandler = function (target) {
        // this.model.heading = "Wd";
        this.model.changeHeading();
        // $(target).text(this.getHeading());
        // self.model.notify();
    }
}

function HeadingState() { //States container
    let self = this;
    this.state = new HelloState(self); //initial state

    this.changeState = function() {
        self.state.next();
    }

    this.getValue = function () {
        return self.state.value;
    }
}

function HelloState(container) {
    let self = this; 
    this.container = container; 
    this.value = "Hello";
    container.state = this;

    this.next = function () {
        return new WorldState(self.container);
    }

}
function WorldState(container) {
    let self = this; 
    this.container = container; 
    this.value = "World";
    container.state = this;

    this.next = function () {
        return new HelloState(self.container);
    }

}

(function main() {
    // new Model();
    // let controller = new Controller();
    new View(new Controller(new Model()));
})();


// //testStates
// let cont = new HeadingState();
// console.log(cont.getValue());
// cont.next();
// console.log(cont.getValue());
// cont.next();
// console.log(cont.getValue());
// cont.next();
