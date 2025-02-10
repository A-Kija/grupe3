// Kodą rašo Andrius Mikalauskas IF-1/9 andriusmik

class Masina {

    constructor(model) {
        this.spalvos = ['nedažyta', 'raudona', 'mėlyna', 'juoda'];
        this.model = model;
        this.spalvosKodas = 0;
    }

    // nudazyti(spalva) {
    //     this.spalvosKodas = this.spalvos.indexOf(spalva);
    // }

    set dazomosSpalvosKodas(spalvosKodas) {
        console.log('Spalvos kodas:', spalvosKodas);
        if (parseInt(spalvosKodas) !== spalvosKodas) {
            console.error('Spalvos kodas turi būti skaičius');
            return;
        }
        if (this.spalvos[spalvosKodas] === undefined) {
            console.error('Spalvos kodas turi būti intervale nuo 0 iki ' + (this.spalvos.length - 1));
            return;
        }
        this.spalvosKodas = spalvosKodas;
    }

    spalva() {
        console.log('Spalvos kodas:', this.spalvosKodas);
        return this.spalvos[this.spalvosKodas];
    }
}




// Kodą rašo Roberta Uldukė IF-1/9 RobertaUlduke


const m1 = new Masina('T-800');
const m2 = new Masina('T-1000');

// m2.dazomosSpalvosKodas = 100;

m2.spalvosKodas = 100;

// console.log(m1.spalva());
console.log(m2.spalva());