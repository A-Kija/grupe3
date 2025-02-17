import Dot from './Dot.js';

export default class Panel {

    #dots = [];

    constructor(cols, rows, dotSize) {
        this.panel = document.querySelector('[data-panel]');
        this.panel.style.width = cols * dotSize + 'px';
        this.panel.style.height = rows * dotSize + 'px';

        for (let x = 0; x < cols; x++) {
            this.#dots[x] = [];
            for (let y = 0; y < rows; y++) {
                this.#dots[x][y] = new Dot(x, y, dotSize);
                this.panel.appendChild(this.#dots[x][y].element);
            }
        }

    }



}