class Kibiras1 {
    constructor(kamDuotasKibiras = 'Neaiškus') {
        this.akmenuKiekis = 0;
        this.akmenuRinkejas = kamDuotasKibiras;
    }

    prideti1Akmeni() {
        this.akmenuKiekis++;
    }

    pridetiDaugAkmenu(kiekis) {
        this.akmenuKiekis += kiekis;
    }

    kiekPririnktaAkmenu() {
        console.log(this.akmenuRinkejas + ' kibiras yra užpildytas ' + this.akmenuKiekis + ' akmenais');
    }
}

const petroKibiras = new Kibiras1('Petro');
const marytesKibiras = new Kibiras1('Marytės');
const zibutesKibiras = new Kibiras1('Žibutės');

petroKibiras.prideti1Akmeni();
petroKibiras.pridetiDaugAkmenu(5);
marytesKibiras.prideti1Akmeni();
marytesKibiras.prideti1Akmeni();
zibutesKibiras.prideti1Akmeni();
petroKibiras.pridetiDaugAkmenu(2);
zibutesKibiras.pridetiDaugAkmenu(3);

petroKibiras.kiekPririnktaAkmenu();
marytesKibiras.kiekPririnktaAkmenu();
zibutesKibiras.kiekPririnktaAkmenu();

console.clear();

class Pinigine {
    constructor() {
        this.popieriniaiPinigai = 0;
        this.metaliniaiPinigai = 0;
    }

    ideti(pinigas) {
        if (pinigas <= 2) {
            this.metaliniaiPinigai += pinigas;
        } else {
            this.popieriniaiPinigai += pinigas;
        }
    }

    skaiciuoti() {
        console.log('Popieriniu pinigu suma: ' + this.popieriniaiPinigai + ' $.');
        console.log('Metaliniu pinigu suma: ' + this.metaliniaiPinigai + ' $.');
        console.log('---------------------------');  
    }
}

const kasandrosPinigine = new Pinigine();
const hulioPinigine = new Pinigine();

kasandrosPinigine.ideti(5);
kasandrosPinigine.ideti(0.5);
kasandrosPinigine.ideti(20);
kasandrosPinigine.ideti(2);
kasandrosPinigine.ideti(1);

hulioPinigine.ideti(5);
hulioPinigine.ideti(5);
hulioPinigine.ideti(5);
hulioPinigine.ideti(5);
hulioPinigine.ideti(5);
hulioPinigine.ideti(3.5);
hulioPinigine.ideti(2);

kasandrosPinigine.skaiciuoti();
hulioPinigine.skaiciuoti();

console.log(hulioPinigine);

console.clear();


// Kodą rašo Aivaras
class Troleibusas {

    constructor() {
        this.keleiviuSkaicius = 0; 
    }

    ilipa(keleiviuSkaicius) {
        this.keleiviuSkaicius += keleiviuSkaicius;
    }

    islipa(keleiviuSkaicius) {
        // const islipo = Math.min(this.keleiviuSkaicius, keleiviuSkaicius);
        if (this.keleiviuSkaicius < keleiviuSkaicius) {
            throw new Error('Per daug keleiviu nori islipti');
        }
        // this.keleiviuSkaicius -= islipo;
    }

    vaziuoja() {
        console.log('Troleibusu vaziuoja ' + this.keleiviuSkaicius + ' keleiviai.');
    }
}

// Kodą rašo Janina

const troleibusas10 = new Troleibusas();
const troleibusas12 = new Troleibusas();

troleibusas10.ilipa(5);
troleibusas10.ilipa(3);
troleibusas10.islipa(2);

troleibusas12.ilipa(7);

try {
    troleibusas12.islipa(17);
} catch (error) {
    console.log('Klaida: ' + error.message);
}



troleibusas10.vaziuoja();
troleibusas12.vaziuoja();