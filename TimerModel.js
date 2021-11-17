function TimerModel() {}

TimerModel.prototype.initialize  = function() {};
TimerModel.prototype.processForm  = function() {};
TimerModel.prototype.remove  = function() {
    utils.getResult(this, () => this.processFormRemove);
    clearInterval(this.timer);
};

