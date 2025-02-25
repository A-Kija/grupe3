import Dot from './Dot.js';
import LS from './LocalStorage.js'; // Importuojam LocalStorage klasę, galiu keisti pavadinimą

export default class Panel extends LS {

    #dots = [];

    constructor(dataKey, colsOrId, rows, dotSize) {
        super(dataKey);
        if (colsOrId === undefined ) {
            return; // imituojame overload 1. Funkcija veiks su 1 argumentu. Nereikia aktyvaus panelio (read) 
        }
           
        if (colsOrId && rows && dotSize) {
            this.dotSize = dotSize;
            this.cols = colsOrId;
            this.rows = rows;
            this.type = 'create';
            // Funkcija su 4 argumentais (create)
        } else {
            this.editData = this.edit(colsOrId);
            this.dotSize = this.editData.dotSize;
            this.cols = this.editData.dots.length;
            this.rows = this.editData.dots[0].length;
            this.type = 'edit';
            // Funkcija su 2 argumentais (edit)
        }
        
        this.startEnd = false;
        this.color = 'black';
        this.panel = document.querySelector('[data-panel]');
        this.clearButton = document.querySelector('[data-panel-clear]');
        this.panelColor = document.querySelector('[data-panel-color]');


        this.panel.style.width = this.cols * this.dotSize + 'px';
        this.panel.style.height = this.rows * this.dotSize + 'px';

        for (let x = 0; x < this.cols; x++) {
            this.#dots[x] = [];
            for (let y = 0; y < this.rows; y++) {
                this.#dots[x][y] = new Dot(x, y, this.dotSize, this);
                if (this.type === 'edit') {
                    this.#dots[x][y].dot = this.editData.dots[x][y];
                }
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

    removeAllDots() {
        for (let x = 0; x < this.#dots.length; x++) {
            for (let y = 0; y < this.#dots[x].length; y++) {
                this.#dots[x][y].element.remove();
            }
        }
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