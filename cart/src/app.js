console.log('Sveiki atvykę į mano parduotuvę!');


const URL = 'https://in3.dev/knygos/';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        renderBooks(data);
    });



const renderBooks = books => {
    const booksDiv = document.querySelector('[data-books]');
    const bookTemplate = document.querySelector('[data-book-template]');
    booksDiv.innerHTML = '';
    books.forEach(book => {
        const div = bookTemplate.content.cloneNode(true);
        const title = div.querySelector('[data-title]');
        const author = div.querySelector('[data-author]');
        const image = div.querySelector('[data-image]');
        const price = div.querySelector('[data-price]');
        title.innerText = book.title;
        author.innerText = book.author;
        image.src = book.img;
        price.innerText = book.price;
        booksDiv.appendChild(div);
        
    });
}

