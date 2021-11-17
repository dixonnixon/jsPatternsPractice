function Colleague(ctrl) {
    this.ctrl = ctrl;
    // console.log(ctrl);

    this.registerModel = function() {
        this.ctrl.register(this, "model");
    };

    this.registerView = function() {
        this.ctrl.register(this, "view");
    };
} 

function Model(id, ctrl) {
    this.id = id;
    Colleague.call(this, ctrl);

    this.registerModel();
    
    // this.recieveMessage = function(worker, raise) {
    //     console.log(`${worker.name} should get ${raise} dollar raise`);
    // };  

    // this.approveRaise = function(worker, raise) {
    //     console.log(`${worker.name}'s ${raise} dollar raise is approved`);
    //     return true;
    // };  
    this.heading = "String";


    this.notify = function (val) {
        ctrl.observers.forEach(function (observer) {
            observer.update(val); //???self
        });
    }

    this.initObservers  = () => this.observers = []; 

    // Object.defineProperty(this, 'heading', {
    //     // get: () => { console.log("Model get Triggered!)"); return this.heading; },
    //     set: (val) => {  console.log("Model set Triggered!)"); this.notify(val); }
    // });

    this.setHeading = function(val) {
        this.heading = val;
        this.notify(val);
    }

    this.getHeading = function() {
        return this.heading;
    }
}

function View(id, ctrl) {
    this.id = id;
    Colleague.call(this, ctrl);

    this.registerView();

    this.$heading = $('#heading');
    this.$heading.html(this.ctrl.getColleague("model").heading);

    this.ctrl.handle('click',"caption:update", this.$heading, {keyCode: 64, data: "haha"});

    this.update = function(data) {
        this.$heading.html(data);
        // this.raise +=  raise;
        // console.log(`My new pay is ${this.raise} dollars`);
    };
}

function Controller($doc) {
    this.colleagues = {};
    this.observers = [];


    this.register = function(colleague, type) {
        switch(type) {
            case "model":
                if(this.colleagues[type]) {
                    this.colleagues[type].initObservers();
                }
                this.colleagues[type] = colleague;
                break;
            case "view":
                if(this.colleagues["model"] == false)
                    throw new Error("Enter The Model!");
                this.observers.push(colleague);
                break;
        }
    }
    
    this.getColleague = (name) => this.colleagues[name];
    
    // this.handle = function(event, worker, manager) {
    this.handle = function(eventType, eventName, $selector, options) { //функция создания события ->rf:factory
        let opts = options || {};
        // console.log(this.colleagues);
        let evt = $.Event(eventName, opts);
        evt.ctrl = this;

        if(eventName == "caption:update")
        {
            let data = null; //!!
            // $selector.on(eventType, {data: "data"}, function() { $doc.trigger(evt) });
            $selector.on(eventType, { data: data }, (e) => $doc.trigger(evt, e));
        }
        // manager.recieveMessage(worker, raise);
        // if(manager.approveRaise(worker, raise)) {
        //     worker.recieveRaise(raise);
        // }; 
    }


    $doc.on('caption:update', function(evt, origEvt) {
        // console.log(evt, origEvt, origEvt.data); origEvt has aditioan data : ->fE
        evt.preventDefault();
        evt.ctrl.getColleague("model").setHeading('dw');
    });

    

    

    // this.notify = function () {
    //     Object.keys(this.colleagues).map(function(el, i, arr) {
    //         // console.log(this, el, (this.hasOwnProperty(el)));
    //         // if(this.hasOwnProperty(el)) {
    //         //     this[el].update();
    //         // }
    //         console.log(this[el], this[el].hasOwnProperty('update'));
    //         if(this[el].hasOwnProperty('update')) {
    //             this[el].update(el);
    //         }
    //     }, this.colleagues);
    // }
}


(function main() {
    let ctrl = new Controller($(document));

    new Model("caption", ctrl), 
    new View("header", ctrl);

    
})();