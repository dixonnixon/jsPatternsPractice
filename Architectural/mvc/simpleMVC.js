/**
 * Simple MVC
 *
 * 2016 Todd Zebert
 *
 * repetative module pattern (and eslint directives) are so it can be
 * easily customized and broken into multiple files
 */


/**
 * Simple MVC, 2016 Todd Zebert
 * Event Listeners and notifications module
 */
 var simpleMVC = (function simpleMVC(simple) { //Subject in Observer
    'use strict';
  
    // sender is the context of the Model or View which originates the event
    simple._Event = function SimpleEvent(sender) {
      this._sender = sender;
      this._listeners = [];
    };
  
    simple._Event.prototype = {
      // add listener closures to the list
      attach(listener) { //subscribe
        console.log(`Listener:`, this._sender, this._listeners, listener);

        this._listeners.push(listener);
      },
      // loop through, calling attached listeners
      //trigger in other words
      notify(args) {
        this._listeners.forEach(
            (v, i) => {
                v(this._sender, args);
                console.log(`notify Listeners[${i}]:`, v ,v(this._sender, args),this._listeners[i], this._sender, args);
            }
        )
      }
    };
  
    return simple;
  })(simpleMVC || {});
  
  
  /**
   * Simple MVC, 2016 Todd Zebert
   * Model module
   */
  var simpleMVC = (function simpleMVC(simple) { // eslint-disable-line no-redeclare, no-shadow
    'use strict';
  
    simple.Model = function SimpleModel(data) {
      this._data = data;
      this._user = "?";
      this.result = "?";
      console.log("data", this._data);
  
      this.onSet = new simple._Event(this);
      this.chooseTheWayOfInputData = new simple._Event(this);
      this.chooseDetail = new simple._Event(this);
      this.chooseBlock = new simple._Event(this);
    };
  
    // define getters and setters
    simple.Model.prototype = {
      // get just returns the value
      get() {
        return this._data;
      },
      // sets the value and notifies any even listeners
      set(data) {
          console.log("data", data);
        this._data = data;
        this.onSet.notify({ data: data });
      },
    };
  
    return simple;
  })(simpleMVC || {}); // eslint-disable-line no-use-before-define, no-redeclare, no-shadow
  
  
  /**
   * A 1-way View Module
   */
  var simpleMVC = (function simpleMVC(simple) { // eslint-disable-line no-redeclare, no-shadow
    'use strict';
  
    simple.OneWayView = function simpleOneWayView(model, selector) {
  
      this._model = model;
      this._selector = selector;
        console.log("view", this._model);
      // since not a 2-way, don't need to set this.onChanged
  
      // attach model listeners
      this._model.onSet.attach(
        () => this.show()
      );
  
    };
  
    simple.OneWayView.prototype = {
      show() {
        console.log("show", this._model);

        this._selector.innerHTML = this._model.get();
      },
    };
  
    return simple;
  })(simpleMVC || {}); // eslint-disable-line no-use-before-define, no-redeclare, no-shadow
  
  
  /**
   * A 2-way View Module
   */
  var simpleMVC = (function simpleMVC(simple) { // eslint-disable-line no-redeclare, no-shadow
    'use strict';
  
    // selector is a DOM element that supports .onChanged and .value
    simple.TwoWayView = function simpleTwoWayView(model, selector) {
  
      this._model = model;
      this._selector = selector;
  
      // for 2-way binding
      this.onChanged = new simple._Event(this);
  
      // attach model listeners
      this._model.onSet.attach(
        () => this.show()
      );
  
      // attach change listener for two-way binding
      this._selector.addEventListener("change", 
        e => this.onChanged.notify(e.target.value)
      );
  
    };
  
    simple.TwoWayView.prototype = {
      show() {
        this._selector.value = this._model.get();
      },
    };
  
    return simple;
  })(simpleMVC || {}); // eslint-disable-line no-use-before-define, no-redeclare, no-shadow
  
  
  /**
   * Controller module
   */
  var simpleMVC = (function simpleMVC(simple) { // eslint-disable-line no-redeclare, no-shadow
    'use strict';
  
    simple.Controller = function SimpleController(model, view) {
  
      this._model = model;
      this._view = view;
  
      if (this._view.hasOwnProperty('onChanged')) {
        this._view.onChanged.attach(
            function(sender, data)  { 

                this.update(data); 
            }
        );
      }
    };
  
    simple.Controller.prototype = {
      update(data) {
        console.log("controller Update", data, this._model);
        this._model.set(data);
      },
    };
  
    return simple;
  })(simpleMVC || {}); // eslint-disable-line no-use-before-define, no-redeclare, no-shadow
  
  
  /**
   * main
   *
   * for demonstration
   */
  var main = function() {
    var model = new simpleMVC.Model(66), // 12 is initial value
        
    //   aView = new simpleMVC.TwoWayView(model, document.getElementById('points-a')),
    //   aController = new simpleMVC.Controller(model, aView), // eslint-disable-line no-unused-vars
        
        bView = new simpleMVC.OneWayView(model, document.getElementById('points-b')),
    //   aView = new simpleMVC.OneWayView(model, document.getElementById('points-a')),

        bController = new simpleMVC.Controller(model, bView); // eslint-disable-line no-unused-vars
    //   aController = new simpleMVC.Controller(model, aView); // eslint-disable-line no-unused-vars
  
        // these are for initial show, if not shown some other way
        // aView.show();
        bView.show();
        bController.update(50);
        // example of changing the model directly
        // window.setTimeout(
        // // () => model.set(20),
        // 4000
        // );
    
  };
  
  document.addEventListener('DOMContentLoaded', main, false);