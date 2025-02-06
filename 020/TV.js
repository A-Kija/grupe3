// Petras Malinauskas
// 2019-12-10

class TV {

    constructor(model, owner) {
        console.log(`Pirkėjui ${owner} parduotas televizorius ${model}`);
        this.owner = owner;
        this.model = model;
        this.channel = 0;
    }

    perjungtiKanala(naujasKanalas) {
        this.channel = naujasKanalas;
    }

    kaZiuri() {
        if (this.channel === 0) {
            console.log(`${this.owner} nieko nežiūri`);
        } else {
            console.log(`${this.owner} žiūri ${this.channel} kanalą`);
        } 
    }  

}



// Ona Kučinskaitė
// 2022-06-10

const tv1 = new TV('Samsung', 'Petras');
const tv2 = new TV('LG', 'Ona');
const tv3 = new TV('Sony', 'Bebras');

tv2.perjungtiKanala(1);
tv1.perjungtiKanala(3);

tv1.kaZiuri();

tv3.kaZiuri();

tv2.kaZiuri();
