import Panel from './Panel.js';

export default class View {

    constructor() {
        if (document.querySelector('[data-crud-view-create]')) {
            this.viewCreate();
        }
    }


    viewCreate() {
        this.panel = new Panel(10, 10, 10, 'dots');
        this.panel.create(); // nereikia, tik dėl pavyzdžio
        const storeButton = document.querySelector('[data-panel-store]');
        storeButton.addEventListener('click', _ => {
            this.panel.store({dots: this.panel.getDotsData()});
        });
    }

}