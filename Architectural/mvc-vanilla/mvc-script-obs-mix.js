function Model(id, heading) {
    this.id = id;
    this.heading = heading;

    
}

function View(ctrl, $doc) {
    this.controller = ctrl;
    this.controller.register(this);
    this.heading = $('#heading');
    this.heading.html(this.controller.getHeading());

    let evt1 = $.Event('evt1heading');
    evt1.ctrl = this.controller;

    this.heading.on('click', ()  => $doc.trigger(evt1));

    // View.registerWith = function(controller) { 
    //     this.controller = controller;
    //     this.controller.addView(this);
      
    // };

    $doc.on('evt1heading', function(e) {
        e.preventDefault();
        e.ctrl.model.heading = 'dw';
        e.ctrl.notify();
    })

    this.notify = function () {
        this.heading.html(this.controller.getHeading());
    }
}

function Controller(model) {
    this.model = model;
  
    this.observers = [];
   
    this.getHeading = function () {
        return this.model.heading;
    }

    this.register = function(view) {
        this.observers.push(view);
    }

    this.notify = function() {
        console.log(this.observers);
        this.observers.map(obs => obs.notify());
    }

    
}

(function main() {
    new View(new Controller(new Model("head1", "String")), $(document));
})();