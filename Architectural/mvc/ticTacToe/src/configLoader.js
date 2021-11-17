import Board from "./board.js"

async function fetchBoardLength(url) {
    let res = await fetch(url + "src/config.json");
    return res.json();
}

class ConfigLoader {
    #victoryCells  = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    constructor() {
        this.appUrl = this.currentPath();
        
    }

    currentPath() {
        let url = window.location.pathname.toString();
        return url.substring(0, url.lastIndexOf("/")) + "/";
    }

    async load() {
        this.#victoryCells = await this.victoryCells();
        const settings = await fetchBoardLength(this.appUrl);
        this.boardLength = parseInt(settings.boardSize);
        this.genBoard();
    }

    genBoard() {
        this.board = Board.getInstance(this.boardLength);
    }

    get cellsLength() {
        return this.#victoryCells.length;
    }

    victoryCells() {    
        return  Promise.resolve(this.#victoryCells);
    }
}

export default ConfigLoader;