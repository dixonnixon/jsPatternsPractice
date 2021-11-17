// let data = new Model();


const login = (function(debug) {
    const model = new Model('', '', false);
    let controller = new Controller(model, null);

    controller.subscribe(debug);

    let view = new View(
        $('#login'), controller
    );

    view.registerWith(controller);


    return {
        render: view.render
    }

})(debug);

login.render();

