//Chellange: ShoppingCart

function ShoppingCartModel(id = null) {
    const cartCap = "TheOrder# ";

    this.updateCart = new Event();

    this.id = id;
    this.cart = '';
    this.getOrderCaption = () => { 
        this.id = Math.random(10); 
        this.updateCart.trigger(cartCap + this.id);
    }
}

function Product(itemNumber, itemName, qTy, price) {
    this.itemNumber = itemNumber;
    this.itemName = itemName;
    this.itemQuality = qTy;
    this.itemPrice = price;

    this.getItemNumber = function () {
        return this.itemNumber;
    };
    this.getItemName = function () {
        return this.itemName;
    };
    this.getItemQuality = function () {
        return this.itemQuality;
    };
    this.getItemPrice = function () {
        return this.itemPrice;
    };
}

function View() {
    this.msg = null;
    this.registerWith = function (controller) {
        this.controller = controller;
        this.controller.addView(this);
    }

    this.setMessage = (msg) => this.msg = msg;
}

function ShoppingCartView() {
    // this.controller = null;
    this.getOrderCaption = new Event(); 

    

    View.call(this);

    this.displayMessage = () => { 
        if(this.msg) console.log( this.msg); 
    }

    this.displayItem = function(itemNumber,itemName,itemQuantity,itemPrice) 
    { 
        this.displayMessage();
        console.log(`Item Number: ${itemNumber}\nItem: ${itemName}\nQuantity: ${itemQuantity}\nPrice: ${itemPrice}`); 
        this.setMessage(`\n--------------------------------\n`);
        this.displayMessage();
        this.msg = null;
    } 

    this.changeItemQuantity = function(itemNumber, newQuantity) {
        this.controller.change("quality", itemNumber, newQuantity)
    };

    this.updateCaption = function(caption) {
        this.caption.innerText = caption;
    }

    this.buyItem = function (name, qty, price) {

        this.controller.buy(name, qty, price);
    }

    this.render = function() {
        const cart = document.createElement('div');
        cart.className = 'cart';
        
        this.caption = document.createElement('div');
        this.getOrderCaption.trigger();
        
        this.message = document.createElement('div');
        this.message.className = 'message';

        cart.appendChild(this.caption);
        document.body.appendChild(cart);
        document.body.appendChild(this.message);
    }
}

ShoppingCartView.prototype = new View();



ShoppingCartController.prototype.addView = function(view) {
    this.view = view;
}

ShoppingCartController.prototype.updateView = function () {
    this.itemList.map((el) => {
        this.view.displayItem(el.getItemNumber(), el.getItemName(), el.getItemQuality(), el.getItemPrice()); 
    }, this.view);
}

ShoppingCartController.prototype.buy = function (name, qty, price) {
    this.view.setMessage("\n-------------buying item...\n");
    this.itemList.push(new Product(this.itemList.length, name, qty, price));
    this.updateView();
}

ShoppingCartController.prototype.change = function (prop, id, qty) {
    this.view.setMessage("\n***********************\n");
    let objProperty;
    switch(prop) {
        case "quality":
            objProperty = "itemQuality";
            break;
    }

    if(this.itemList[id]) {
        this.itemList[id][objProperty] = qty;
        this.updateView();
        // return this.employees[id]
    } 
    else 
    {
        console.log("incorrect Id");
    }
}

function Event() { //Subjsect, Publisher
    this.itemList = [];

    this.attach = function(observer) {
        this.itemList.push(observer);
    }

    this.trigger = function(params) {
        this.itemList.forEach(listener => { listener(params); });
    }
}

function ShoppingCartController() {
    
    // this.model = null;
    this.model = new ShoppingCartModel();
    this.view = new ShoppingCartView();
    this.view.registerWith(this);

    this.itemList = []; //list of models|observers|subscribers

    this.view.getOrderCaption.attach(() => this.model.getOrderCaption());
    this.model.updateCart.attach(
        (id, caption) => this.view.updateCaption(id, caption));
    
    this.run = function() {
        this.view.buyItem("Popcorn", 3, 2.50);
        this.view.changeItemQuantity(0, 6);
        this.view.buyItem("Popcorn", 3, 2.50);
        this.view.changeItemQuantity(0, 7);
    
        this.view.render();
    }
}

var controller = new ShoppingCartController();
controller.run();


