
//lets consider a case with multiple presenters with 0ne view 
//Experimental

function Model() {
    let text = null;

    Object.defineProperty(this, 'text', {
        get:() => text,
        set:(val) => text = val
    });
}

function View() {
    let $containers = {
        lower: $('div#isUpper'),
        upper: $('div#isLower')
    }

    this.presenters = {};

    this.registerWith = function(presenter, type) {
        this.presenters[type] = presenter;
    }

    //похоже это события
    this.displayError = function(type) {
        let msg = "Text is not in " + type + "Case";
        console.log(msg);
        $containers[type].html(msg);
    }

    //Вид так же отображает обновленные дынные вернувшийся из Ведущего 
    this.displayMessage = function(text, type) {
        let msg = "The  text is: " + text;
        $containers[type].html(msg);
    }

    //передает действия пользователя Ведущему: позволяет пользователю изменить текст
    //т.е. оповещает Ведущего  который сам вызывает собственную функцию с этим текстом

    //как бы пользователь не пытался изменить данные через Предствление
    //изменение данных возвращается к ведущему
    this.changeText = function(text) {
        // this.presenters.changeText(text);
        for(let p in this.presenters)
        {
            this.presenters[p].changeText(text);
        }
    }
}


// Только Ведущий работает с моделью!
function Presenter(view) {
    // this.view = view;
    // this.model = null;

    let vw = view;
    let model = null;
    
    Object.defineProperties(this, {
        view: {
            get: () => vw
        },
        'model': {
            // value: null,
            set: (m) => model = m
        },
        changeText: {
            value: function(text) {
                if(text != text.toUpperCase() ) 
                {
                    vw.displayError('upper');
                } 
                else
                {
                    model.text = text;
                    vw.displayMessage(model.text, 'upper');
                }
            }
        }
    });
    
    
}

function PresenterLower(view) {
    // this.view = view;
    // this.model = null;

    let vw = view;
    let model = null;
    
    Object.defineProperties(this, {
        view: {
            get: () => vw
        },
        'model': {
            // value: null,
            set: (m) => model = m
        },
        changeText: {
            value: function(text) {
                if(text != text.toLowerCase()) 
                {
                    vw.displayError('lower');
                } 
                else
                {
                    model.text = text;
                    vw.displayMessage(model.text, 'lower');
                }
            }
        }
    });
    
    
}

const App = (function() {
    function App() {

        let $inp = $('<input type="text" id="isIs"/>');

        $('div#container').append($inp);


        this.run = function () {
            let model = new Model('HW!');
            let view = new View();
            let presenter = new Presenter(view);
            let presenterLower = new PresenterLower(view);

            presenter.model = model;
            presenterLower.model = model;

            view.registerWith(presenter, 'upper');
            view.registerWith(presenterLower, 'lower');

            $inp.on('keyup', function(e) {
                e.preventDefault();
                console.log($(e.target).val());
                view.changeText($(e.target).val());
            });
        }

        
        

        

        
    }

    return App;
})();

let app = new App();
$(document).ready(app.run);