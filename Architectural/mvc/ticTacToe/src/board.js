let instance = null;

class Board {
    constructor(size) {
        // console.log(size);
        this.size = size;
        this.itself = Array(size);
    }

    fill() {
        // console.log(this.itself);
        this.itself.fill();
        return this.itself;
    }

    get() {
        return this.itself;
    }

    static getInstance(size) {
        if(!instance){
            instance = new Board(size);
        }
        return instance;
    }
}

export default Board;