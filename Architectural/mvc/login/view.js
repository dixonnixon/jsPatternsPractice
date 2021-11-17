let View = (function () {
    let loginCtrl = null;

    function CreateLoginView(container, controller) {
        this.$container = container;
        loginCtrl = controller;

        let elementsSelectors = {
            "execute": 'form#'+ loginCtrl.getId() + " button#execute",
            "un": 'form#'+ loginCtrl.getId() + " input#un",
            "pw": 'form#'+ loginCtrl.getId() + " input#pw"
        };

        // this.validationResult = validationResult;
        
        this.createHtml = () => `<form id="${loginCtrl.getId()}">
            <fieldset>
                <legend>${loginCtrl.getCaption()}</legend>
                <label for="un"></label>Ник:<input type="text" id="un" />
                <label for="pw"></label>Пароль:<input type="password"" id="pw" />
                <label for="rememberMe">Запомнить</label><input type="checkbox" id="rememberMe" />
            </fieldset>
            <button type="button" id="execute">Войти</button>
            </form>`;

        this.render = () => this.$container.html(this.createHtml());

        this.$container.on('click', elementsSelectors.execute, function(e) {
           
            loginCtrl.executeLogin().then(function(system) {
                system.render();
            });
        });

        this.$container.on('keyup', elementsSelectors.un, function(e) {
            loginCtrl.setUn($(e.target).val());
        });

        this.$container.on('keyup', elementsSelectors.pw, function(e) {
            loginCtrl.setPw($(e.target).val());
        });
    }

    CreateLoginView.prototype.registerWith = function(controller) { 
        loginCtrl = controller;
        loginCtrl.setView(this);
        // this.controller.addModel(this);
    };

    CreateLoginView.prototype.update = function(content) {
        this.$container.html(content);
    }

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