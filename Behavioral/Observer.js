//MajorBehavioral pattern
//Позволяет обьектам(observers, subscribers) подписанным на событие (event)
// ждать ввода и реагировать на ввод при получении уведомления
// (в том смысле что им не нужно периодически проверять предоставлен ввод или неты)

//Главный обьект (Subject) поддерживает списк всех подписчиков (subscribers)
// и всякий раз когда происходит событие, Главный (Subject) оповещает потпищиков так
//что они обновляют свои состояния соответственно

// Пример. Website ------posts----->aRticles
//          User------check website periodically----------->new Articles by topics
// User ---- subscribe ----->  WebSite
// User -----notifies------>when new Article posted


//Использовать:
// 1. // Низкая связанность бла бла т.е улучшить управление кодом разбивая огромные приложения в системы слабо связанных объектов!!!!)))))
// 2. Чтоб предоставить большую гибкость путем создания динамических отношений объектов и подписчиков

function Subject() { // 
    this.observerList = [];
    this.newArticlePosted = false; //state?
    this.articleName = null;

    this.getUpdate = function() {
        return this.articleName;
    };

    this.postNewArticle = function(articleName) {
        this.articleName = articleName;
        this.newArticlePosted = true;
        this.notify();
    }
};

Subject.prototype.subscribe = function(observer) {
    this.observerList.push(observer);
};

Subject.prototype.unsubscribe = function(observer) {
    this.observerList = this.observerList.fill(obs => obs !== observer); //создает новый список (массив) без выбранного подписчика
};

Subject.prototype.notify = function() {
    if(this.newArticlePosted) {
        this.observerList.forEach(subscriber => subscriber.update());
    }
};


function Observer()  {//наблюдатель
    // this.subject = new Subject(); //зачем??????????????
    
    this.setSubject = function(subject) {
        this.subject = subject;
    }
}

Observer.prototype.update = function() {
    if(this.subject.getUpdate() == null)
    {
        console.log("No new article")
    } else
    {
        console.log(`The new article ${this.subject.getUpdate()} is posted`);
    }
}

var subject = new Subject();
var observer = new Observer();
observer.setSubject(subject);

subject.subscribe(observer);
observer.update();
subject.postNewArticle("Dark matter");
subject.postNewArticle("Dark matter HAHA");


//challenge: Auction System ----------------------- Доделать!!!!!!

function Auctioneer() { //Subject
    this.bidders = [];
    this.newBiddingPrice = false;
}

Auctioneer.prototype.registerBidder = function(bidder) {
    this.bidders.push(bidder);
};

Auctioneer.prototype.announceNewBidderPrice = function() {
    this.notifyBidders();
};

Auctioneer.prototype.notifyBidders  = function() {
    // this.bidderList.forEach(bidder => bidder.update())
    this.bidders.forEach(function(bidder) {
        bidder.update();
    });
};


function Bidder(name) { //Observer
    this.name = name;
    this.bidPrice = null;

    this.update = function() {
        console.log(`${this.name} is offering ${this.bidPrice} dollars`);
        if(this.bidPrice > 500) {
            console.log(`Sold to ${this.name}`);
        }
    };

    this.giveNewPrice = function(bidPrice) {
        this.bidPrice = bidPrice;
    }
}


let auctioner = new Auctioneer();
let bidder1 = new Bidder("Ross");
auctioner.registerBidder(bidder1);
let bidder2 = new Bidder("Joey");
auctioner.registerBidder(bidder2);
bidder1.giveNewPrice(400);
bidder2.giveNewPrice(550);
auctioner.announceNewBidderPrice();