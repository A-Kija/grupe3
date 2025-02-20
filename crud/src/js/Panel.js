import Dot from './Dot.js';
import LS from './LocalStorage.js'; // Importuojam LocalStorage klasę, galiu keisti pavadinimą

export default class Panel extends LS {

    #dots = [];

    constructor(dataKey, cols, rows, dotSize) {
        super(dataKey);
        if (cols === undefined || rows === undefined || dotSize === undefined) {
            return; // imituojame overload 1. Funkcija veiks su 1 argumentu 2. Funkcija veiks su 4 argumentais 
        }
        this.startEnd = false;
        this.color = 'black';
        this.panel = document.querySelector('[data-panel]');
        this.clearButton = document.querySelector('[data-panel-clear]');
        this.panelColor = document.querySelector('[data-panel-color]');
        this.dotSize = dotSize;
        this.panel.style.width = cols * this.dotSize + 'px';
        this.panel.style.height = rows * this.dotSize + 'px';

        for (let x = 0; x < cols; x++) {
            this.#dots[x] = [];
            for (let y = 0; y < rows; y++) {
                this.#dots[x][y] = new Dot(x, y, this.dotSize, this);
                this.panel.appendChild(this.#dots[x][y].element);
            }
        }

        this.panel.addEventListener('mousedown', _ => this.startEnd = true);
        this.panel.addEventListener('mouseup', _ => this.startEnd = false);
        this.clearButton.addEventListener('click', _ => this.clear());
        this.panelColor.addEventListener('input', _ => this.color = this.panelColor.value);
    }





    getDotsData() {
        const data = [];
        for (let x = 0; x < this.#dots.length; x++) {
            data[x] = [];
            for (let y = 0; y < this.#dots[x].length; y++) {
                data[x][y] = this.#dots[x][y].dot;
            }
        }
        return data;
    }


    clear() {
        for (let x = 0; x < this.#dots.length; x++) {
            for (let y = 0; y < this.#dots[x].length; y++) {
                this.#dots[x][y].dot = false;
            }
        }
        this.panelColor.value = this.color = 'black';
    }



}