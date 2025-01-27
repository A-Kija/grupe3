const URL = 'https://in3.dev/knygos/';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        renderBooks(data);
    });



const renderBooks = books => {
    const ul = document.querySelector('[data-books]');
    const bookTemplate = document.querySelector('[data-book-template]');
    ul.innerHTML = '';
    books.forEach(book => {
        const li = bookTemplate.content.cloneNode(true);
        const title = li.querySelector('[data-title]');
        const author = li.querySelector('[data-author]');
        const image = li.querySelector('[data-img]');
        const price = li.querySelector('[data-price]');
        title.innerText = book.title;
        author.innerText = book.author;
        image.src = book.img;
        price.innerText = book.price;
        ul.appendChild(li);
    });
}