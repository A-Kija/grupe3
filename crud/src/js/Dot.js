export default class Dot {

    #active = false;

    constructor(x, y, size) {
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
            this.element.style.backgroundColor = 'black';
            this.#active = true;
        });
    }

    get dot() {
        return this.#active;
    }

    set dot(value) {
        this.#active = value;
        this.element.style.backgroundColor = value ? 'black' : 'transparent';
    }



}