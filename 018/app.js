console.log('Hello from app.js');

const URL = 'https://in3.dev/knygos/';

let books;


fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        books = data;
        printBookTitles(books);
        printBookImages(books);
        printBookAuthors(books);
        printBookAuthorsAndTitles(books);
    });


console.log('Goodbye from app.js');

console.log(books); // undefined



const bookTitles = books => {
    books.forEach(book => {
        console.log(book.title);
    });
};

// const URL2 = 'https://jsonplaceholder.typicode.com/posts';

// fetch(URL2)
//     .then(atsakymas => atsakymas.json())
//     .then(duomenys => {
//         bookTitles(duomenys); // galima naudoti tą pačią funkciją, nes masyve ir ten ir ten yra title
//     });


const printBookTitles = books => {
    const ul = document.querySelector('ul#nr1');
    ul.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerText = book.title;
        ul.appendChild(li);
    });
}

const printBookImages = books => {
    const ul = document.querySelector('ul#nr2');
    ul.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        // img.src = book.img;
        img.setAttribute('src', book.img); // universalus būdas, veikia ir su kitais atributais
        img.style.width = '100px'; // nebūtina, tik dėl gražumo
        li.appendChild(img);
        ul.appendChild(li);
    });
}

const printBookAuthors = books => {
    const ul = document.querySelector('ul#nr3');
    ul.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerText = book.author;
        ul.appendChild(li);
    });
}


const printBookAuthorsAndTitles = books => {
    const ul = document.querySelector('ul#nr4');
    ul.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerText = `${book.title} - ${book.author}`;
        ul.appendChild(li);
    });
}


