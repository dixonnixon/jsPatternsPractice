let View = (function () {
    let loginModel = null;
    let loginCtrl = null;

    function CreateLoginView(container, controller, model) {
        this.$container = container;
        loginCtrl = controller;

        loginModel = model;
        
        
        // this.validationResult = validationResult;
        
        this.createHtml = () => `<form id="${loginModel.id}">
            <fieldset>
                <legend>${loginModel.caption}</legend>
                <label for="un"></label>Ник:<input type="text" id="un" />
                <label for="pw"></label>Пароль:<input type="text" id="pw" />
                <label for="rememberMe">Запомнить</label><input type="checkbox" id="rememberMe" />
            </fieldset>
            <button type="button" id="execute">Войти</button>
            </form>`;

        this.render = () => this.$container.html(this.createHtml());

        this.$container.on('click', 'form#'+ loginModel.id + " button#execute", function(e) {
            // console.log(loginModel);
            //            
            loginCtrl.executeLogin(loginModel.getUn(), loginModel.getPw());
        });

        this.$container.on('keyup', 'form#'+ loginModel.id + " input#un", function(e) {
            loginModel.setUn($(e.target).val());
            console.log(loginModel);
        });

        this.$container.on('keyup', 'form#'+ loginModel.id + " input#pw", function(e) {
            loginModel.setPw($(e.target).val());
            console.log(loginModel);
        });
    }

    CreateLoginView.prototype.registerWith = function(controller) { 
        loginCtrl = controller;
        loginCtrl.setView(this);
        // this.controller.addModel(this);
    };

    // LoginView.prototype.createfunction 
    return CreateLoginView;
})();
// let View = (function () {
//     function CreateCastleView(document, controller, model, validationResult) {
//         this.document = document;
//         this.controller = controller;
//         this.model = model;
//         this.validationResult = validationResult;
//         var _this = this;

//         this.document.getElementById("saveButton")
//             .addEventListener("click", function() {
//                 return _this.saveCastle();
//             });

//         this.document.getElementById("castleName").value = model.name;
//         this.document.getElementById("description").value =
//             model.description;
//         this.document.getElementById("outerWallThickness").value =
//             model.outerWallThickness;
//         this.document.getElementById("numberOfTowers").value =
//             model.numberOfTowers;
//         this.document.getElementById("moat").value = model.moat;
//     }
//     CreateCastleView.prototype.saveCastle = function () {
//         var data = {
//             name: this.document.getElementById("castleName").value,
//             description: this.document.getElementById("description").value,
//             outerWallThickness: this.document.getElementById("outerWallThickness").value,
//             numberOfTowers: this.document.getElementById("numberOfTowers").value,
//             moat: this.document.getElementById("moat").value
//         };
//         this.controller.saveCastle(data);
//     };
//     return CreateCastleView;
// })();