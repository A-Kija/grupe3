console.log('Sveikas, pasauli!');

class TV {

    #kanalas = 1;
    static kanalai = ['TV3', 'LNK', 'LRT', 'BTV', 'TV6'];

    static kiekKanalu() {
        console.log(`Yra ${this.kanalai.length} kanalai`);
    }


    constructor(savininkas) {
        this.savininkas = savininkas;
    }

    // this.constructor - rodo į klasę, o ne į objektą

    set kanalas(numeris) {
        if (numeris > 0 && numeris <= this.constructor.kanalai.length) {
            this.#kanalas = numeris;
        }
    }

    get kanalas() {
        return this.constructor.kanalai[this.#kanalas - 1];
    }


    kurisKanalas() {
        console.log(`${this.savininkas} žiūri ${this.kanalas}`);
    }

    kiekKanaluTelevizoriuje() {
        this.constructor.kiekKanalu();
    }

}


const manoTV1 = new TV('Petras');
const manoTV2 = new TV('Kristina');
const manoTV3 = new TV('Greta');

const naujiKanalai = kanalai = ['TV3', 'LNK', 'Animal Planet', 'BTV', 'TV6'];

// manoTV1.kanalai = naujiKanalai;
// manoTV2.kanalai = naujiKanalai;
// manoTV3.kanalai = naujiKanalai;

TV.kanalai = naujiKanalai;

const manoTV4 = new TV('Bebras');
manoTV4.kanalas = 3;

manoTV1.kanalas = 3;
manoTV2.kanalas = 3;
manoTV3.kanalas = 3;

manoTV1.kurisKanalas();
manoTV2.kurisKanalas();
manoTV3.kurisKanalas();
manoTV4.kurisKanalas();

TV.kiekKanalu();

manoTV1.kiekKanaluTelevizoriuje();

// manoTV1.kiekKanalu();

console.clear();

class Salis {
    constructor(pavadinimas) {
        this.salis = pavadinimas;
    }
}


class Miskas extends Salis {
    constructor(pavadinimas, salis) {
        super(salis);
        this.miskas = pavadinimas;
    }

    kasMiske() {
        console.log(`Tai yra ${this.rusis}`);
    }
}

class Gyvunas extends Miskas {
    constructor(rusis, uodega, pavadinimas, salis) {
        super(pavadinimas, salis);
        this.rusis = rusis;
        this.uodega = uodega
    }

    kokiaSalis() {
        console.log(`Gyvena ${this.salis}`);
    }
}

class Augalas extends Miskas {
    constructor(rusis, lapas, pavadinimas, salis) {
        super(pavadinimas, salis);
        this.rusis = rusis;
        this.lapas = lapas;
    }
    kasMiske() { // Overwrite
        console.log(`Miške auga didelis ${this.rusis}`);
    }
}


const medis = new Augalas('Beržas', 'Žalias', 'Miškas žaliuojantis', 'Lietuva');

const gyvunas = new Gyvunas('Lape', 'Taip', 'Miškas gyvuojantis', 'Zimbia');

const miskas = new Miskas('Miškas');

medis.kasMiske();

gyvunas.kasMiske();
gyvunas.kokiaSalis();

miskas.kasMiske();

console.log(gyvunas);