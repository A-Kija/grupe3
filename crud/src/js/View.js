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
        // Edit view
        if (document.querySelector('[data-crud-view-edit]')) {
            this.viewEdit();
        }
    }

    viewEdit() {
        
        const id = window.location.hash.replace('#', '');
        this.panel = new Panel('dots', id);

        const editPanel = this.panel.edit(id);

        if (!editPanel) {
            window.location.href = 'index.html';
            return;
        }

        const clearButton = document.querySelector('[data-panel-clear]');
        const updateButton = document.querySelector('[data-panel-update]');
        const cancelButton = document.querySelector('[data-panel-cancel]');
        const verticalMirror = document.querySelector('[data-panel-vertical-mirror]');

        cancelButton.addEventListener('click', _ => {
            window.location.href = 'index.html';
        });

        clearButton.addEventListener('click', _ => {
            this.panel.clear();
        });

        updateButton.addEventListener('click', _ => {
            this.panel.update({ dots: this.panel.getDotsData(), dotSize: this.panel.dotSize }, id);
            window.location.href = 'index.html';
        });

        verticalMirror.addEventListener('click', _ => {
            this.panel.verticalMirror();
        });
    }


    viewCreate() {
        this.panel = new Panel('dots', 10, 10, 10);
        this.panel.create(); // nereikia, tik dėl pavyzdžio
        const storeButton = document.querySelector('[data-panel-store]');
        const cancelButton = document.querySelector('[data-panel-cancel]');
        const x = document.querySelector('[data-panel-x]');
        const y = document.querySelector('[data-panel-y]');
        const dotSize = document.querySelector('[data-panel-dot-size]');
        cancelButton.addEventListener('click', _ => {
            this.panel.clear(); // išvalom panelį. Nebūtina, nes po nukreipimo viskas išnyksta
            window.location.href = 'index.html'; // nukreipimas į index.html vaizdas po veiksmo
        });
        storeButton.addEventListener('click', _ => {
            this.panel.store({ dots: this.panel.getDotsData(), dotSize: this.panel.dotSize }); // išsaugom duomenis store metodu
            this.panel.clear(); // išvalom panelį. Nebūtina, nes po nukreipimo viskas išnyksta
            window.location.href = 'index.html'; // nukreipimas į index.html vaizdas po veiksmo
        });

        [x, y, dotSize].forEach(input => {
            input.addEventListener('input', _ => {
                this.panel.removeAllDots();
                this.panel = new Panel('dots', x.value, y.value, dotSize.value);
                this.panel.create();
            });
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

        const deletePanel = this.panel.Delete(id);

        const panelControl = document.querySelector('[data-panel-controls]');
        const destroyButton = document.querySelector('[data-panel-destroy]');
        const cancelButton = document.querySelector('[data-panel-cancel]');

        if (!deletePanel) {
            // window.location.href = 'index.html';
            // return;
            destroyButton.remove();
            cancelButton.remove();
            const message = document.createElement('div');
            message.style.color = 'crimson';
            message.textContent = 'Signature not found.';
            panelControl.appendChild(message);
        }

        cancelButton.addEventListener('click', _ => {
            window.location.href = 'index.html';
        });
        destroyButton.addEventListener('click', _ => {
            this.panel.destroy(id);
            window.location.href = 'index.html';
        });
    }



}