// import Province from './Province';

function extend(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

function sampleProvinceData() {
    return {
        name: "Asia",
        producers: [
            {name: "Byzantium", cost: 10, production: 9},
            {name: "Attalia", cost: 12, production: 10},
            {name: "Sinope", cost: 10, production: 6},
        ],
        demand: 30,
        price: 20
    };
}

let System = (function(debug) {
    const Model = (function() {
        function Model(role) {
            this.role = role;

            this.asia = new Province(sampleProvinceData());
        }
        return Model;
    })();

    const View = (function () {
        function SysView(container, controller) {
            this.container = container;

            this.render = function() {
                container.html("RealSys");
                console.log("RealSys");
            };

        };



        return SysView;
    })();

    const Ctrl = (function() {

        function Ctrl(model, view) {
            this.view = view;
            this.model = model;

            return this;
        }


        return Ctrl;
    })();

    function System(role, prevCtrl) { //вобщем может и не надо передавать сюда контроллер
        //но как бі віходит что надо
        let model = new Model(role);
        let view = new View(null, null);
        new Ctrl(model, view);

        prevCtrl.setView(view);
        prevCtrl.setLoginSuccess();
        prevCtrl.debug("U R Deferred Superstar!");
        
        // view.render();
    }

    System.prototype.setContainer = function (cnt) {
        
    }

    System.prototype.re = function (cnt) {
        
    }

    console.log("System debug", debug.print("SystemDebug"));

    return System;
})(debug);