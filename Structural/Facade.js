

//упрощает взаимодействие клиента с системой. Использовать чтоб спрятать (большой, сложный, ненужный) код за кодом Фасада от клиента
//когда нужно взаимодействовать с методами библиотеки без знания процессов внутри самой библиотеки. e.g jQ
let orderNumber = 0;


//Оффициант принимает заказ
//1. Прячет  сложные вещи:
//generateId, выбор повара, рпасчет времени 
class PlaceFoodOrder {
  placeOrder(orderDetails) {
    const orderId = PlaceFoodOrder.generateId();
    let chef;
    if (orderDetails.foodType === 'Main Course') {
      chef = new MainCourseChef();
    } else if (orderDetails.foodType == 'Dessert') {
      chef = new DessertChef();
    }
    return chef.addFoodOrder({ orderId, orderDetails });
  }

  static generateId() {
    return ++orderNumber;
  }
}

class FoodOrders {
  constructor() {
    this.orders = [];
  }

  addFoodOrder(order) {
    this.orders.push(order);
    return this.conveyOrder(order);
  }

  timetoMakeOrder(){}
  conveyOrder(order) {}
}

class MainCourseChef extends FoodOrders {
  constructor() {
    super()
    this.assigned = true
    return this;
  }

  timetoMakeOrder(){
    return Math.floor(Math.random() * 50) + 10  
  }

  conveyOrder({orderId,orderDetails}) {
    const time = this.timetoMakeOrder()
    console.log( `Order number ${orderId}: ${orderDetails.foodDetails} will be served in ${time} minutes.`);
  }
}

class DessertChef extends FoodOrders {
  constructor() {
    super()
    this.assigned = true;
    return this;
  }
 
  timetoMakeOrder(){
    return Math.floor(Math.random() * 30) + 10  
  }

  conveyOrder({ orderId, orderDetails }) {
    const time = this.timetoMakeOrder()
    console.log( `Order number ${orderId}: ${orderDetails.foodDetails} will be served in ${time} minutes.`);
  }
}


const customer = new PlaceFoodOrder();
const order1 = customer.placeOrder({foodType: "Main Course", foodDetails: "Pasta with Shrimps"});
const order2 = customer.placeOrder({foodType: "Dessert", foodDetails: "Molten Lava Cake"});


//challenge
class Inventory{
    //initialize the amounts of shampoo, conditioner, and hair serums  
    //check availiablity of products
    //hint: define a function that checks availaibility
    constructor() {
        this.products = {
            "shampoo": 20,
            "conditioner": 20,
            "hair serum": 1000
        };
    }

    available(product) {
        console.log((this.products[product.productName] === undefined), (this.products[product.productName] >= product.amount));
        // if(this.products[product.productName] === undefined) return false;
        // console.log(this.products[product.productName], (this.products[product.productName] < product.amount 
        //     && typeof this.products[product.productName] == 'undefined'));
        if(parseInt(this.products[product.productName]) >= parseInt(product.amount))
            return false;
        return true;
    }
  }
  
  class BuyingProduct extends Inventory {
    buyProduct(product) {
    //   console.log("Define buyProduct") //remove this line before testing
        let res;
        if(this.available(product))
            res = new BuyProduct();
        else res = new PreOrderProduct();
        return res.display(product);
    }
  
  }
  
  class BuyProduct{
    //define it such that it returns a message
    display(product) {
        return `${product.amount} bottles of ${product.productName} are not available. You can Pre-order them on the next page.`
    }
  }
  
  class PreOrderProduct{
    //define it such that it returns a message
    display(product) {
        return `${product.amount} bottles of ${product.productName} are available. Click on "buy" to purchase them.`
    }
  }

var customerShop = new BuyingProduct();
console.log(customerShop.buyProduct({productName: "shampoo", amount : 2}));
console.log(customerShop.buyProduct({productName: "hair serum", amount : 2000}));
console.log(customerShop.buyProduct({productName: "hair serumss", amount : 2000}));
console.log(customerShop.buyProduct({productName: "hair serum", amount : 1001}));

//exp1

