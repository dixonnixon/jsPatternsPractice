//производит определенное кол-во продукции по опр. цене
function Producer(aProvince, data) { //Производитель
    this.province = aProvince;
    this.cost = data.cost;
    this.name = data.name;
    this.production = data.production || 0;

    this.getName = () => { return this.name; };
    this.getCost = () => { return this.cost; };
    this.getProduction = () => { return this.production; };

    this.setCost = (cost) => { return this.cost = parseInt(cost); };
}

Producer.prototype.setProduction = function(amountStr) {
    const amount = parseInt(amountStr);
    const newProd = Number.isNaN(amount) ? 0 : amountStr;
    this.province.totalProduction += newProd - this.production;
    this.production = newProd;
};


// export default Producer;
