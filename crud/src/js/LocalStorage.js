import { v4 as uuidv4 } from 'uuid';



export default class LocalStorage {

    #data;

    constructor(dataKey) {
        this.dataKey = dataKey; // Kur saugosim duomenis
        this.#data = JSON.parse(localStorage.getItem(this.dataKey)) || []; // jeigu nieko nėra, tuomet tuščias masyvas
    }

    save() {
        localStorage.setItem(this.dataKey, JSON.stringify(this.#data)); // išsaugom duomenis į localStorage
    }

     // Veiksmai

    store(data) {
        console.log('Data stored:', data); // naujo įrašo saugojimas
        const id = uuidv4();
        this.#data.push({ id, ...data }); // pridedam naują įrašą į masyvą
        this.save(); // išsaugom duomenis
    }

    update(data, id) {
        console.log('Data updated:', data, id); // esamo įrašo pagal id atnaujinimas
        this.#data = this.#data.map(item => item.id === id ? { id, ...data } : item); // atnaujinam įrašą masyve
        this.save(); // išsaugom duomenis
    }

    destroy(id) {
        console.log('Data deleted:', id); // esamo įrašo pašalinimas pagal id
        this.#data = this.#data.filter(item => item.id !== id); // pašalinam įrašą iš masyvo
        this.save(); // išsaugom duomenis
    }

    // Vaizdai prieš veiksmus

    create() {
        console.log('Data create'); // prieš naujo įrašo sukurimą
    }

    edit(id) {
        console.log('Data edit:', id); // prieš esamo įrašo redagavimą pagal id
        return this.#data.find(item => item.id === id); // grąžinam įrašą pagal
    }

    Delete(id) {
        console.log('Data delete:', id); // patvirtinimas prieš esamo įrašo pašalinimą pagal id
        return this.#data.find(item => item.id === id); // grąžinam įrašą pagal id
    }


    // Vaizdai po veiksmų

    read() {
        console.log('Data read:'); // visų įrašų gavimas
        return this.#data;
    }

    show(id) {
        console.log('Data read:', id); // esamo įrašo gavimas pagal id
    }


}