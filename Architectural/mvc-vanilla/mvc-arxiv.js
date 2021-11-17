
let ProductControls = (function() {
    
    function Model(ctrl) {
        Colleague.call(this, ctrl);

        this.registerModel();
        this.productNm = '';
        this.schNm = '';
    }

    function View(id, ctrl, opts) {
        this.id = id;
        Colleague.call(this, ctrl);
        this.registerView();

        this.lbNm =  opts.lbNm || ':&nbsp;';
        this.lbSch =  opts.lbSch || ':&nbsp;' ;

        console.log(this.ctrl);

            
        
        this.render = function() {
            // let $productControls = this.ctrl.getContainer();

            let $prodNameLabel = $("<label for=\"" + this.id + "Name\">"+ this.lbNm +"</label>");
            let $prodSchemaLabel = $("<label for=\"" + this.id + "Schema\">"+  this.lbSch +"</label>");
            let $prodNm = $("<input>").attr('id', this.id + "Name");
            let $prodSchema = $("<input>").attr('id', this.id + "Schema");
    
            this.ctrl.getContainer()
                .append($prodNameLabel, $prodNm,  $prodSchemaLabel, $prodSchema,);
            // view.appeaddClass('arxiv');
    
            // this.ctrl.getContainer().append($arxiv);
            // return {
            //     $arxiv: $arxiv,
            //     $productControls: $productControls,
            //     $treeControls: $treeControls
            // };
        }
        
        this.update = function(data) {
            this.ctrl.getContainer().find('#' + this.id + "Name").val(data);
            this.ctrl.getContainer().find('#' + this.id + "Schema").val(data);
        }
    }
    
    function ProductControls($container) {
        // Controller.call(this);
        this.colleagues = {};
        this.observers = [];

        this.$container = $container;
        this.getContainer = () => this.$container;

        this.updateEvent = this.factorEvent("controls:update", this.getContainer(), 
            {keyCode: 64, data: "haha"});

            

        let model = new Model(this);
        let view = new View('product', this, {lbNm: "Наименование:&nbsp;", lbSch: "№ чертежа"} );

        this.run = () => this.observers.forEach(element => {
            let rendered = element.render();
        });

        this.getView = () => view;

        this.updateEvent.on()

        $container.on('controls:update', function(evt, origEvt) {
            // console.log(evt, origEvt, origEvt.data); origEvt has aditioan data : ->fE
            evt.preventDefault();
            // evt.ctrl.getColleague("model").setHeading('dw');
            console.log(evt.ctrl);
            evt.ctrl.getColleague("model").changeHeading();
        });
    };

    ProductControls.prototype = new Controller();

    // let ctrl = new ProductControls($('#productControls'));

    return ProductControls;
}) (Colleague);


function Colleague(ctrl) {
    this.ctrl = ctrl;
    console.log(ctrl);

    this.registerModel = function() {
        this.ctrl.register(this, "model");
    };

    this.registerView = function() {
        this.ctrl.register(this, "view");
    };
} 

function Model(id, ctrl) {
    this.id = id;
    let state =  new StateManager();

    Colleague.call(this, ctrl);

    this.registerModel();
    
    // this.recieveMessage = function(worker, raise) {
    //     console.log(`${worker.name} should get ${raise} dollar raise`);
    // };  

    // this.approveRaise = function(worker, raise) {
    //     console.log(`${worker.name}'s ${raise} dollar raise is approved`);
    //     return true;
    // };  
    this.heading = state.getValue();

    this.changeHeading = function() {
        state.changeState(state.state.next());
        this.setHeading(state.getValue());
    }

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

    this.$heading = $('#'+ this.id);
    this.$heading.html(this.ctrl.getColleague("model").heading);

    this.ctrl.handle('click',"caption:update", this.$heading, {keyCode: 64, data: "haha"});
    

    this.update = function(data) {
        this.$heading.html(data);
        // this.raise +=  raise;
        // console.log(`My new pay is ${this.raise} dollars`);
    };

    

    this.render = function() {
        // let view = this.ctrl.getContainer();

        let $arxiv = $('<div></div>').attr("id", "tree");
        let $productControls = $('<div></div>').attr("id", "productControls");
        let $treeControls = $('<div></div>').attr("id", "treeControls");

        $arxiv.append($productControls).append($treeControls);
        // view.appeaddClass('arxiv');

        this.ctrl.getContainer().find('body').append($arxiv);
        return {
            $arxiv: $arxiv,
            $productControls: $productControls,
            $treeControls: $treeControls
        };
        
    }
}

function Controller() {

};

Controller.prototype.register = function(colleague, type) {
    switch(type) {
        case "model":// при регитрации модели  сбрасіваем все наблюдатели 
        // и устанавливаем передаваемую модель
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

Controller.prototype.factorEvent = function(eventName, options) {
    let opts = options || {};
    // console.log(this.colleagues);
    console.log(this.constructor.prototype);
    let evt = $.Event(eventName, opts);
    evt.ctrl = this;
    return evt;
}

 // this.handle = function(event, worker, manager) {
Controller.prototype.handle = function(eventType, eventName, $selector, options) { //функция создания события ->rf:factory
    if(eventName == "caption:update")
    {
        let data = null; //!!
        // $selector.on(eventType, {data: "data"}, function() { $doc.trigger(evt) });
        $selector.on(eventType, { data: data }, 
            (e) => { 
                this.getContainer()
                    .trigger(this.factorEvent(eventName, options), e);
            });
    }
    // if(eventName == "controls:update")
    // {
    //     let data = null; //!!
    //     // $selector.on(eventType, {data: "data"}, function() { $doc.trigger(evt) });
    //     $selector.on(eventType, { data: data }, 
    //         (e) => { 
    //             this.getContainer().trigger(this.factorEvent(eventName, options), e);
    //         });
    // }
    // manager.recieveMessage(worker, raise);
    // if(manager.approveRaise(worker, raise)) {
    //     worker.recieveRaise(raise);
    // }; 
}


function Arxiv($doc) {
    this.colleagues = {};
    this.observers = [];

    this.$doc = $doc;
    
    this.getColleague = (name) => this.colleagues[name];
    
    this.getValue = () => this.getColleague("model").heading;

    $doc.on('caption:update', function(evt, origEvt) {
        // console.log(evt, origEvt, origEvt.data); origEvt has aditioan data : ->fE
        evt.preventDefault();
        // evt.ctrl.getColleague("model").setHeading('dw');
        evt.ctrl.getColleague("model").changeHeading();

    });

    this.getContainer = () => this.$doc;

    this.observe = function(observer) {
        this.observers.push(observer);
    }

    this.run = () => this.observers.forEach(element => {
        let rendered = element.render();
        let ctrlProduct = new ProductControls(rendered.$productControls);
        // this.observe(ctrlProduct.getView()); //Вариант подписки Представления
        ctrlProduct.run();

    });
}

Arxiv.prototype = new Controller();

    
function StateManager() {
    this.state = new HelloState(this); //initial state

    this.changeState = function(newState) {
        this.state = newState;
    }

    this.getValue = function () {
        return this.state.value;
    }
}

function HelloState(container) {
    this.container = container; 
    this.value = "Hello";
    container.state = this;

    this.next = function () {
        return new WorldState(this.container);
    }
}

function WorldState(container) {
    this.container = container; 
    this.value = "World";
    container.state = this;

    this.next = function () {
        return new HelloState(this.container);
    }
}


(function main() {
    let ctrl = new Arxiv($(document));

    new Model("caption", ctrl), 
    new View("heading", ctrl);
    // new View("header", ctrl);

    ctrl.run()
})();

//http://jsfiddle.net/x2dfd/3/
//https://stackoverflow.com/questions/15101243/how-should-i-make-complex-sequential-events-in-javascript