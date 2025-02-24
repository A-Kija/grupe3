import Panel from './Panel.js';

export default class View {

    constructor() {
        // Create view
        if (document.querySelector('[data-crud-view-create]')) {
            this.viewCreate();
        }
        // Read view
        if (document.querySelector('[data-crud-view-read]')) {
            this.viewRead();
        }
        // Delete view
        if (document.querySelector('[data-crud-view-delete]')) {
            this.viewDelete();
        }
    }
    

    viewCreate() {
        this.panel = new Panel('dots', 10, 10, 10);
        this.panel.create(); // nereikia, tik dėl pavyzdžio
        const storeButton = document.querySelector('[data-panel-store]');
        const cancelButton = document.querySelector('[data-panel-cancel]');
        cancelButton.addEventListener('click', _ => {
            this.panel.clear(); // išvalom panelį. Nebūtina, nes po nukreipimo viskas išnyksta
            window.location.href = 'index.html'; // nukreipimas į index.html vaizdas po veiksmo
        });
        storeButton.addEventListener('click', _ => {
            this.panel.store({dots: this.panel.getDotsData(), dotSize: this.panel.dotSize}); // išsaugom duomenis store metodu
            this.panel.clear(); // išvalom panelį. Nebūtina, nes po nukreipimo viskas išnyksta
            window.location.href = 'index.html'; // nukreipimas į index.html vaizdas po veiksmo
        });
    }

    viewRead() {
        this.panel = new Panel('dots');
        this.panels = this.panel.read();
        this.panelsSection = document.querySelector('[data-panels]');
        console.log(this.panels);
        this.panels.forEach(panel => {
            const panelElement = document.createElement('div');
            panelElement.style.width = panel.dots.length * panel.dotSize + 'px';
            panelElement.style.height = panel.dots.length * panel.dotSize + 'px';
            panelElement.style.position = 'relative';
            
            panel.dots.forEach((row, x) => {
                row.forEach((dot, y) => {
                    // signature start
                    const dotElement = document.createElement('div');
                    dotElement.style.width = panel.dotSize + 'px';
                    dotElement.style.height = panel.dotSize + 'px';
                    dotElement.style.backgroundColor = dot ? dot : 'transparent';
                    dotElement.style.position = 'absolute';
                    dotElement.style.left = x * panel.dotSize + 'px';
                    dotElement.style.top = y * panel.dotSize + 'px';
                    panelElement.appendChild(dotElement);
                    // signature end
                });
            });

            const dotSignature = document.createElement('div');
            dotSignature.classList.add('dot-signature');

            const buttonEdit = document.createElement('button');
            buttonEdit.textContent = 'Edit';
            buttonEdit.classList.add('edit');
            buttonEdit.addEventListener('click', _ => {
                window.location.href = `edit.html#${panel.id}`;
            });
            const buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'Delete';
            buttonDelete.classList.add('delete');
            buttonDelete.addEventListener('click', _ => {
                window.location.href = `delete.html#${panel.id}`;
            });
            dotSignature.appendChild(panelElement);
            dotSignature.appendChild(buttonEdit);
            dotSignature.appendChild(buttonDelete);
            this.panelsSection.appendChild(dotSignature);
        });
    }

    viewDelete() {
        this.panel = new Panel('dots');
        const id = window.location.hash.replace('#', '');

        const destroyButton = document.querySelector('[data-panel-destroy]');
        const cancelButton = document.querySelector('[data-panel-cancel]');
        cancelButton.addEventListener('click', _ => {
            window.location.href = 'index.html';
        });
        destroyButton.addEventListener('click', _ => {
            this.panel.destroy(id);
            window.location.href = 'index.html';
        });
    }



}