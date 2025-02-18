

export default class LocalStorage {


    constructor(key) {
        this.key = key;
        this.data = JSON.parse(localStorage.getItem(this.key)) || [];
    }

     // Veiksmai

     store(data) {
        console.log('Data stored:', data); // naujo įrašo saugojimas
    }

    update(data, id) {
        console.log('Data updated:', data, id); // esamo įrašo pagal id atnaujinimas
    }

    destroy(id) {
        console.log('Data deleted:', id); // esamo įrašo pašalinimas pagal id
    }

    // Vaizdai prieš veiksmus

    create() {
        console.log('Data create'); // prieš naujo įrašo sukurimą
    }

    edit(data, id) {
        console.log('Data edit:', data, id); // prieš esamo įrašo redagavimą pagal id
    }

    Delete(id) {
        console.log('Data delete:', id); // patvirtinimas prieš esamo įrašo pašalinimą pagal id
    }


    // Vaizdai po veiksmų

    read() {
        console.log('Data read:', id); // visų įrašų gavimas
    }

    show(id) {
        console.log('Data read:', id); // esamo įrašo gavimas pagal id
    }


}