let Model = (function(debug) { //state of the programm
   function Model(un, pw, rememberMe) {
        this.un = un;
        this.pw = pw;
        this.rememberMe = rememberMe;

        this.loggedIn = false;
        
        this.errorMessage = "Вы не зашли.";

        this.caption = "Введите логин и пароль:";
        this.id = "loginForm";

        this.setUn = function(un) {
            this.un = un;
        }

        this.setPw = function(pw) {
            this.pw = pw;
        }

        this.getUn = function() {
            return this.un;
        }

        this.getPw = function() {
            return this.pw;
        }
    }

    let mock = function(un, pass) {
        let obj = [
            {   
                un: "joe@ukr.net",
                pwSumm: "123",
                ac: "tech",
                id: 1,
                name: "Ivan"
            },
            {
                un: "mike@ukr.net", 
                pwSumm: "456",
                ac: "user",
                id: 2,
                name: "Petya"
            },
            {
                un: "hann@ukr.net",
                pwSumm: 456,
                ac: "contr",
                id: 3,
                name: "Vasiliy"
            },
        ];
        return obj.filter(function(el) { 
            return el.un === un && el.pwSumm.toString() === pass.toString(); 
        } );
    };

    Model.prototype.getUser = function() {
        
        let usr = mock(this.un, this.pw);
        return $.Deferred(function(deferred) {
            // console.log("USR", usr, typeof usr, typeof usr[0]);
            if(Array.isArray(usr) && typeof usr[0] === 'object') { 
                debug.print(`Вы вошли как ${usr[0].name}`);
                deferred.resolve(usr[0]); return; 
            }
            deferred.reject("Пользователь не найден!"); 
        }).promise();
    };
    return Model;
})(debug);


// var Model = (function () {
//     function Model(name, description, outerWallThickness,
//     numberOfTowers, moat) {
//     this.name = name;
//     this.description = description;
//     this.outerWallThickness = outerWallThickness;
//     this.numberOfTowers = numberOfTowers;
//     this.moat = moat;
//     }
//     return Model;
//     })();