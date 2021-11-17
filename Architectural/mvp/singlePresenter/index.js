
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
    let $result =  $('div#isUpper');
    let $inp = $('<input type="text" id="isIs"/>');
    this.presenter = null;

    this.registerWith = function(presenter) {
        this.presenter = presenter;
    }

    //похоже это события
    this.displayError = function(handler) {
        let msg = "Text is not in upperCase";
        $result.html(msg);
    }

    //Вид так же отображает обновленные дынные вернувшийся из Ведущего 
    this.displayMessage = function(text) {
        let msg = "The  text is: " + text;
        $result.html(msg);
    };

    this.addCheckCaseHandler = function(handler, logPresenter) {
        //Что будет если здесь перебросить Текщий Вид на другого Ведущего
        //this.registerWith(logPresenter); ??? 
        // Но у него должон быть метод changeText!!!
        let pr = this.presenter;
        $inp.on('keyup', function(e) {
            //logic__))) here
            e.preventDefault();
            // $inp.val();
            // console.log($(e.target).val());
            handler($(e.target).val()); //Вызвать метод зависимого Ведущего после 
            //изменения модели
            console.log(pr,  pr.getModelValue());
            logPresenter.view.addRow(pr.getModelValue());
        });
    };
    
    this.getInput = () => $inp;
        
        
    //передает действия пользователя Ведущему: позволяет пользователю изменить текст
    //т.е. оповещает Ведущего  который сам вызывает собственную функцию с этим текстом

    //как бы пользователь не пытался изменить данные через Предствление
    //изменение данных возвращается к ведущему
    this.changeText = function(text) {
        // this.presenters.changeText(text);
        this.presenter.changeText(text);
    }
}


// Только Ведущий работает с моделью!
//Может содержать обработчики которіе вызываются внутри событий)
function Presenter(view) {
    // this.view = view;
    let model = null;

    let vw = view;

    vw.registerWith(this);
    console.log(vw === view);


    this.log = new LogPresenter(new LogView());
    this.log.setModel();
    

    this.handlers = {
        changeText: function(text) {
            //Use model Here
            //Use Another Presenter, hence, View Here or create it here
    
            //так что тут мы можем присоеденить сторонние Ведущие
            //тоесть получаем вложенные Ведущие
            console.log("addHandler", this);
            vw.changeText(text);
            //вообщем много интересного)))
        }
    };

    vw.addCheckCaseHandler( this.handlers['changeText'], this.log);

    this.getModelValue = () => model.text;
    
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
                    model.text = text; //добавляем в модель только при условии
                    vw.displayMessage(model.text, 'upper');
                }
            }
        },
        inp: {
            get: () => vw.getInput()
        }
    });
}

function LogPresenter(view) {
    this.view = view;
    this.model = null; //должен хранить массив записей_) или регистр или чтото такое)


    this.view.registerWith(this);

    this.setModel = function() {
        this.model = [];
    }

    this.getView = function() {
        return this.view.getContainer();
    }

    this.addRow = function(val) {
        // this.view.
        //все зависит от того что за модель
        console.log(this.view.getContainer(), val);
        this.view.getContainer().append($('<div>' + val + '</div>'));
     }
}

function LogView() {
    this.presenter = null; //Can have multiple presenters

    let list = $('<div id="log" class="active"></div>');
    let row = $('<div id="row"></div>');

    this.registerWith = function(presenter) {
        this.presenter = presenter;
    }

    this.addRow = function(val) {
        this.presenter.addRow(val);
    }

    this.getContainer = () => list;
}


const App = (function() {
    function App() {

        this.run = function () {
            let model = new Model('HW!');

            //можно создавать модель тут но зачем?? а можно внутри Ведущего))
            //хай пока так
            let presenter = new Presenter(new View());

            presenter.model = model;//тут вызывается условный метод но в приложении
            //портала я буду его прописывать или хз))

            $('div#container').append(presenter.inp)
                .append(presenter.log.getView());
        }
        
    }

    return App;
})();

let app = new App();
$(document).ready(app.run);