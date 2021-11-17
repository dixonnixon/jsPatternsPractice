function View(ctrl) {
    this.controller = ctrl;
    this.heading = $('#heading');
    this.heading.html(this.controller.getHeading());
    this.heading.on('click', this.controller.on);
}

function Model() {
    this.heading = "Hello";
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
        $(target).text(this.getHeading());
    }
}

(function main() {
    // new Model();
    // let controller = new Controller();
    new View(new Controller(new Model()));
})();

