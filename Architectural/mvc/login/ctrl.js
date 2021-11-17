let Controller = (function (Sytstem, debug) { //Является Медиатором между Отображением и Моделью
    
    function User(id, name) {
        // this.hr = hr;
        this.id = id;
        this.name = name;
        // this.raise = raise;
    
        // this.register = function() {
        //     this.hr.registerEmployee(this);
        // };
    
        // this.register();
    }

    let Admin = (function() {
        function Admin() {}

        extend(Admin, User);
        return Admin;
    })();

    let Tech = (function() {
        function Tech() {}

        extend(Tech, User);
        return Tech;
    })();

    let Constr = (function() {
        function Constr() {}

        extend(Constr, User);
        return Constr;
    })();


    function Controller(model, view) {
        this.view = view;
        this.model = model;
        this.subscribers = {};


        this.setLoginSuccess = function() {
            this.model.loggedIn = true;
            this.debug("Login: successful");
        }

        this.subscribe = function (observer) {
            this.subscribers[observer.constructor.name] = observer;
        }
    
        this.executeLogin = function() {
            //here need to fetch from DB and compare hash-sums
            
            return $.when(this.getUser(), $.Deferred().resolve(this))
                .then(function(user, ctrl) {
                    // console.log($.extend({},user, {$container: this.view.$container, ctrl: this}));
                    // if(user)
                    console.log(user, ctrl);
                    let role;
                    switch(user.ac) {
                        case "admin":
                            role = new Admin(user.id, user.name);
                            break;
                        case "tech":
                            role = new Tech(user.id, user.name);
                            break;
                        case "constr":
                            role = new Constr(user.id, user.name);
                            break;
                        default:
                            throw new Error(`неизвестный тип: ${user.ac}`);
                    }
                    return new System(role, ctrl);
                }, rejectedMsg => debug.print(rejectedMsg));
            // if(this.model.getUn() && this.model.getPw() && this.model.getPw() != 1)
            // {
            //     // $.get('/login', { un: un, pw: pw}).then(function(res) {
                
            //     $.Deferred().resolve({id: 1, access: 'user', $container: this.view.$container, ctrl: this})
            //         .then(function(res) {
            //             if(res.access === 'user') {

            //                 new System(res.id, res.$container, res.ctrl); //fecade
            //             }
                        
            //         });
            // }
            // else 
            // {
            //     this.view.update(this.model.errorMessage);
            // }
        }
    }

    Controller.prototype.getUser = function() {
        return this.model.getUser();
    };

    Controller.prototype.debug = function(message) {
        let subs = Object.keys(this.subscribers);

        if(this.model.loggedIn === true) {
            subs.forEach(function(obsName) {
                this[obsName].addRow(message);
            }, this.subscribers);
        }
    };

    Controller.prototype.setView = function(view) {
        this.view = view;
    }

    Controller.prototype.getId = function() {
        return this.model.Id;
    }

    Controller.prototype.getCaption = function() {
        return this.model.caption;
    }

    Controller.prototype.setUn = function(un) {
        this.model.setUn(un);
    }

    Controller.prototype.setPw = function(pw) {
        this.model.setPw(pw);
    }

    Controller.prototype.isLoggedIn = function() {
        return this.model.loggedIn;
    }


    return Controller;
})(System, debug);



/**
 * 
 * 
 * 

var Controller = (function () {
    function Controller(document) {
        this.document = document;
    }

    Controller.prototype.createCastle = function () {
        this.setView(new CreateCastleView(this.document, this));
    };

    Controller.prototype.saveCastle = function (data) {
        var validationResult = this.validate(data);
        if (validationResult.IsValid) {
            //save castle to storage
            this.saveCastleSuccess(data);
        } else {
            this.setView(new CreateCastleView(this.document, this, data,
            validationResult));
        }
    };
    Controller.prototype.saveCastleSuccess = function (data) {
        this.setView(new CreateCastleSuccess(this.document, this, data));
    };

    Controller.prototype.setView = function (view) {
    //send the view to the browser
    };

    Controller.prototype.validate = function (model) {
        var validationResult = new validationResult();
        if (!model.name || model.name === "") {
            validationResult.IsValid = false;
            validationResult.Errors.push("Name is required");
        }
        return;
    };

    return Controller;
})();

 */