const URL = 'https://in3.dev/knygos/';
let cart = []; // priskyrimas tik dėl tipo deklaravimo. Deklaravimas tik dėl aiškumo.
let books = null; // null reiškia, kad dar nepasibaigė užklausa į serverį



const init = _ => {
    getBooks();
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart(cart);
}

const addToCart = id => {
    const book = books.find(book => book.id === id);
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(cart);
}

const booksAddEventListeners = _ => {
    addButtons = document.querySelectorAll('[data-add]');
    addButtons.forEach(button => {
        button.addEventListener('click', _ => {
            addToCart(parseInt(button.dataset.id));
        });
    });
}

const getBooks = _ => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks(books);
            booksAddEventListeners();
        });
}

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
        const button = div.querySelector('[data-add]');
        title.innerText = book.title;
        author.innerText = book.author;
        image.src = book.img;
        price.innerText = book.price.toFixed(2) + ' €';
        button.dataset.id = book.id;
        booksDiv.appendChild(div);
    });
}

const renderCart = books => {
    const booksDiv = document.querySelector('[data-cart-list]');
    const bookTemplate = document.querySelector('[data-cart-template]');
    booksDiv.innerHTML = '';
    books.forEach(book => {
        const div = bookTemplate.content.cloneNode(true);
        const title = div.querySelector('[data-title]');
        const count = div.querySelector('[data-count]');
        const image = div.querySelector('[data-image]');
        const price = div.querySelector('[data-price]');
        const button = div.querySelector('[data-remove]');
        title.innerText = book.title;
        count.innerText = 1;
        image.src = book.img;
        price.innerText = book.price.toFixed(2) + ' €';
        button.dataset.id = book.id;
        booksDiv.appendChild(div);
    });
}

init();