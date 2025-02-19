console.log('Hello, Mars!');


class Mars {

    static mars = []; // telpa 2 Marsai
    
    static pridetiPalydovą() {
        if (this.mars.length === 0) {
            const id = this.getRandomId();
            const palydovas = 'Deimas';
            const mars = new Mars(id, palydovas);
            this.mars.push(mars);
            return mars;
        } else if (this.mars.length === 1) {
            const id = this.getRandomId();
            const palydovas = 'Fobas';
            const mars = new Mars(id, palydovas);
            this.mars.push(mars);
            return mars;
        } else {
            return this.mars[Math.random() > 0.5 ? 0 : 1];
        }
    }

    static getRandomId() {
        return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    }

    constructor(id, pavadinimas) {
        this.id = id;
        this.pavadinimas = pavadinimas;
    }
}


// console.log(Mars.pridetiPalydovą());
// console.log(Mars.pridetiPalydovą());
// console.log(Mars.pridetiPalydovą());
// console.log(Mars.pridetiPalydovą());
// console.log(Mars.pridetiPalydovą());

class Taskas {

    constructor () {
        this.taskas = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    }

}

class Taskai {

    constructor() {
        this.taskai = [];
        for (let i = 0; i < 10; i++) {
            this.taskai.push(new Taskas());
        }
    }
}

const daugTasku = [];
for (let i = 0; i < 10; i++) {
    daugTasku.push(new Taskai());
}

let c = 0;

daugTasku.sort((a, b) => {
    console.log(++c);
    const sumaA = a.taskai.reduce((total, t) => total + t.taskas, 0);
    const sumaB = b.taskai.reduce((total, t) => total + t.taskas, 0);
    return sumaB - sumaA;
});

console.log(daugTasku);

daugTasku.forEach(taskai => {
    console.log(taskai.taskai.reduce((total, t) => total + t.taskas, 0));
});


