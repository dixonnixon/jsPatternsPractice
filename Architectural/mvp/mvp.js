//model - предоставляет данные которые требует приложение и которые надо коказывать в Предствлении
//view - отображает данные из модели, предает команды/действия пользователя Ведущему
//   для действий в ссответствии с данными
//presenter (Ведущий) - действует посредником между моделью и преставлением. Получает/извлекае данные
//  из модели, манипулирует ими, возвращает в представление для отображения. Реагирует на
//  возаисодействия пользователя с Предствлением


//  Разница меж MVC&MVP:
//    Presenter has  1-1 mapping with the view. IF Colplex View, then it can use multiple presenters

//E.G.

function Model() {
    let text = null;

    Object.defineProperty(this, 'text', {
        get:() => text,
        set:(val) => text = val
    });
}

function View() {
    this.presenter = null;

    this.registerWith = function(presenter) {
        this.presenter = presenter;
    }

    //похоже это события
    this.displayError = function() {
        console.log("Text is not in upperCase");
    }

    //Вид так же отображает обновленные дынные вернувшийся из Ведущего 
    this.displayMessage = function(text) {
        console.log("The  text is: " + text);
    }

    //передает действия пользователя Ведущему: позволяет пользователю изменить текст
    //т.е. оповещает Ведущего  который сам вызывает собственную функцию с этим текстом

    //как бы пользователь не пытался изменить данные через Предствление
    //изменение данных возвращается к ведущему
    this.changeText = function(text) {
        this.presenter.changeText(text);
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
                if(text != text.toUpperCase()) 
                {
                    vw.displayError();
                } 
                else
                {
                    model.text = text;
                    vw.displayMessage(model.text);
                }
            }
        }
    });
    
    
}

let model = new Model('HW!');
let view = new View();
let presenter = new Presenter(view);

presenter.model = model;
view.registerWith(presenter);
presenter.view.changeText("unagiй");
presenter.view.changeText("UNAGIЙ");

view.changeText('THINK?');

model.text = "JIGURDA";

//1. Для многократного повторного использования логики представления
//  пример: выбор между выпадающим списком и контекстным (всплывающим) меню

//2. Когда приложение требует много пользвовательских взаимодействий!!
// 3. Когда комплексные(сложные представления) -- 1 If the view is complex, it can use multiple presenters.
//     !РАЗОБРАТЬ ЭТОТ СЛУЧАЙ

// 4. ДлЯ облегчения тестирования: ведущий может предоставить мактетный
//    (фиктивный) интерфейс для тестирования (unit Testing)


//Challenge


function ModelMail(senderName, recieverName, email) {
    this.senderName = senderName;
    this.recieverName = recieverName;
    this.email = email;

    this.getSenderName = function() {
        return this.senderName;
    } 
    
    this.getRecieverName = function() {
        return this.recieverName;
    } 
    
    this.getEmail = function() {
        return this.email;        
    } 
    this.setSenderName = function(val) {
        this.senderName = val;
    } 
    
    this.setRecieverName = function(val) {
        this.recieverName = val;
    } 
    
    this.setEmail = function(val) {
        this.email = val;        
    }
}

function ViewMail() {
    this.presenter = null; //Can have multiple presenters

    this.registerWith = function(presenter) {
        this.presenter = presenter;
    }

    this.sendEmail = function(from, to, text) {
        this.presenter.sendEmail(from, to, text);
    }
}

function PresenterMail(view) {
    this.view = view;
    this.model = null;

    this.setModel = function(m) {
        this.model = m;
    }
    
    this.getView = function() {
        return this.view;
    }

    this.sendEmail = function(from, to, text) {
        this.model.setEmail(text);
        this.model.setSenderName(from);
        this.model.setRecieverName(to);
        console.log(`Email From: ${this.model.getSenderName()} ` + 
            `To: ${this.model.getRecieverName()} Title: ${this.model.getEmail()}`);
    }
}

var model1   = new ModelMail()
var view1 = new ViewMail()
var presenter1 = new PresenterMail(view1)
presenter1.setModel(model1)
view1.registerWith(presenter1)

presenter1.getView().sendEmail("Rachel", "Joey", "Rent Discussion")
presenter1.getView().sendEmail("Monica", "Phoebe", "Smelly Cat Draft")

