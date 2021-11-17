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

    var heading = "Hello";
    this.observers = [];
    this.register = function (observer) {
        self.observers.push(observer);
    }

    this.notify = function () {
        self.observers.forEach(function (observer) {
            observer.update(self.heading); //???self
        });
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
        this.model.heading = "Wd";
        // $(target).text(this.getHeading());
        // self.model.notify();
    }
}

(function main() {
    // new Model();
    // let controller = new Controller();
    new View(new Controller(new Model()));
})();

