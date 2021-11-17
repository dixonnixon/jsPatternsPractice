// import Producer from "./Producer.js";

let checkZeroDemand = function(demand) {
    if(demand.length === 0)
    return true;
};

function Province(doc) { //Область
    if('string' === typeof doc.producers)
        throw new Error('\nНет выборки');
    this.demand = doc.demand;// спрос

    this.producers = []; //производители

    this.name = doc.name;
    this.totalProduction = 0; 
   
    this.price = doc.price;// цена

    console.log(doc.producers, typeof doc.producers);

    doc.producers.forEach((el) => {
        this.addProducer(new Producer(this, el))
    });

    

    this.getName = function() { return this.name; };
    this.getProducers = function() { return this.producers.slice(); };
    this.getTotalProduction = function() {
        return this.producers.reduce(function(p, c) { return p + c.production; }, 0); 
    };
    this.getDemand = function() { return this.demand; };
    this.getPrice = function() { return this.price; };

    this.setPrice = function(arg) { this.price = parseInt(arg); };
    this.setDemand = function(arg) { this.demand = parseInt(arg); };
    this.setTotalProduction = function(arg) { this.totalProduction = arg};

    this.getShortfall = function() { //расчет дефецита
        // if(this.getDemand().length === 0)
        //     return NaN;
        return checkZeroDemand(this.getDemand()) ? NaN : this.demand - this.getTotalProduction();
    };
    
}

Province.prototype.getProfit = function() { //расчет прибыли 

    
    return checkZeroDemand(this.getDemand()) ? NaN : this.demandValue() - this.demandCost();
}

Province.prototype.addProducer = function(arg) {
    this.producers.push(arg);
    this.totalProduction += arg.production;   
    console.log(this.totalProduction); 
};


Province.prototype.demandCost = function()  {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
        .sort((a, b) => a.cost - b.cost)
        .map(p => {
            const contribution = Math.min(remainingDemand, p.production);
            remainingDemand -= contribution;
            result += contribution * p.cost;
        });
    return result;
};

Province.prototype.satisfiedDemand = function()  { 
    // console.log(this);
    return  Math.min(this.demand, this.getTotalProduction()); 
};

Province.prototype.demandValue = function() { 
    return this.satisfiedDemand() * this.price; 
    // return 5; 
};


// export default Province;