//Chellange: ShoppingCart



function ShoppingCartModel(itemNumber, itemName, qTy, price) {
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
    this.controller = null;

    View.call(this);

    this.displayMessage = () => { 
        if(this.msg) console.log( this.msg); }

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

    this.buyItem = function (name, qty, price) {

        this.controller.buy(name, qty, price);
    }
}

ShoppingCartView.prototype = new View();

function ShoppingCartController() {
    this.model = null;
    this.view = null;
    this.itemList = [];

    this.addView = function(view) {
        this.view = view;
    }
    this.addModel = function(model) {
        this.model = model;
    }
}

ShoppingCartController.prototype.updateView = function () {
    this.itemList.map((el) => {
        this.view.displayItem(el.getItemNumber(), el.getItemName(), el.getItemQuality(), el.getItemPrice()); 
    }, this.view);
}

ShoppingCartController.prototype.buy = function (name, qty, price) {
    this.view.setMessage("\n-------------buying item...\n");
    this.itemList.push(new ShoppingCartModel(this.itemList.length, name, qty, price));
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

var view = new ShoppingCartView();
var controller = new ShoppingCartController();
view.registerWith(controller);

view.buyItem("Popcorn", 3, 2.50);
view.changeItemQuantity(0, 6);
view.buyItem("Popcorn", 3, 2.50);
view.changeItemQuantity(0, 7);

