// Aivaro kodas
class TV {

    #channel = 1;  // privatus kintamasis

    constructor(brand, owner) {
        this.channels = ['LRT', 'TV3', 'BTV', 'TV8', 'LNK'];
        this.brand = brand;
        this.owner = owner;
        
    }

    set channel(channel) {       // seteris (setter)
        if (channel !== parseInt(channel) || channel < 1 || this.channels.length < channel) {
            console.log('Tokia kanalo nėra.');
            return;
        }
        this.#channel = channel;
    }

    watchNow2(channel) {       // seteris (setter)
        if (channel !== parseInt(channel) || channel < 1 || this.channels.length < channel) {
            console.log('Tokia kanalo nėra.');
            return;
        }
        this.#channel = channel;
    }

    get show() { // geteris (getter)
        return this.channels[this.#channel - 1];
    }

    show2() { // geteris (getter)
        return this.channels[this.#channel - 1];
    }

    get channel() {
        return this.#channel;
    }

    whatIsOnNow() {
        console.log(`${this.owner} žiūri ${this.channels[this.#channel - 1]} kanalą.`);
    }
}


// Kristinos kodas

const TV1 = new TV('Philips', 'Petras');
const TV2 = new TV('Samsung', 'Janina');
const TV3 = new TV('Sony', 'Bebras');




TV1.channel = 3;
TV2.channel = 1;
TV3.watchNow2(5);

console.log(TV1.show);
console.log(TV1.show2());

TV3.channel = 200;

console.log(TV3.channel);

TV1.whatIsOnNow();
TV2.whatIsOnNow();
TV3.whatIsOnNow();
