export default class Dot {

    #active = false;

    constructor(x, y, size, panel) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = size + 'px';
        this.element.style.height = size + 'px';
        this.element.style.left = x * size + 'px';
        this.element.style.top = y * size + 'px';

        this.element.addEventListener('mouseover', _ => {
            if (panel.startEnd) {
                this.element.style.backgroundColor = panel.color;
                this.#active = panel.color;
            }
        });
    }

    get dot() {
        return this.#active;
    }

    set dot(value) {
        this.#active = value;
        this.element.style.backgroundColor = value ? value : 'transparent';
    }



}