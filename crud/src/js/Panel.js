import Dot from './Dot.js';

export default class Panel {

    #dots = [];

    constructor(cols, rows, dotSize) {
        this.startEnd = false;
        this.color = 'black';
        this.panel = document.querySelector('[data-panel]');
        this.clearButton = document.querySelector('[data-panel-clear]');
        this.panelColor = document.querySelector('[data-panel-color]');
        this.panel.style.width = cols * dotSize + 'px';
        this.panel.style.height = rows * dotSize + 'px';

        for (let x = 0; x < cols; x++) {
            this.#dots[x] = [];
            for (let y = 0; y < rows; y++) {
                this.#dots[x][y] = new Dot(x, y, dotSize, this);
                this.panel.appendChild(this.#dots[x][y].element);
            }
        }

        this.panel.addEventListener('mousedown', _ => this.startEnd = true);
        this.panel.addEventListener('mouseup', _ => this.startEnd = false);
        this.clearButton.addEventListener('click', _ => this.clear());

    }

    clear() {
        for (let x = 0; x < this.#dots.length; x++) {
            for (let y = 0; y < this.#dots[x].length; y++) {
                this.#dots[x][y].dot = false;
            }
        }
    }



}