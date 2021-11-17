function Button(text, width, height, id, cssClass) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.id = id;
    this.cssClass = cssClass;

}
Button.prototype.render = function() {
    return `<button class="${this.cssClass}" id="${this.id}" style="width:${this.width};height:${this.height}">${this.text}</button>`;
};

let buttonIns = new Button("Hi", 200, 300, "setMe", "setMe");

console.log(buttonIns.render());

