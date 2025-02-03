const URL = 'https://in3.dev/knygos/';
let cart = []; // priskyrimas tik dėl tipo deklaravimo. Deklaravimas tik dėl aiškumo.
let books = null; // null reiškia, kad dar nepasibaigė užklausa į serverį



const init = _ => { // iškart iškviečiamas, kai užkraunamas puslapis
    getBooks();
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

const addToCart = id => {
    cart.push({id, count: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const removeFromCart = id => {
    cart = cart.filter(book => book.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const booksAddEventListeners = _ => {
    addButtons = document.querySelectorAll('[data-add]');
    addButtons.forEach(button => {
        button.addEventListener('click', _ => {
            addToCart(parseInt(button.dataset.id));
        });
    });
}

const cartAddEventListeners = _ => {
    const cartList = document.querySelector('[data-cart-list]');
    removeButtons = cartList.querySelectorAll('[data-remove]');
    removeButtons.forEach(button => {
        button.addEventListener('click', _ => {
            removeFromCart(parseInt(button.dataset.id));
        });
    });
}


const getBooks = _ => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks();
            renderCart();
        });
}

const renderBooks = _ => {
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
    booksAddEventListeners();
}

const renderCart = _ => {
    const booksDiv = document.querySelector('[data-cart-list]');
    const bookTemplate = document.querySelector('[data-cart-template]');
    booksDiv.innerHTML = '';
    const booksInCart = cart.map(book => {
        const bookData = books.find(bookData => bookData.id === book.id);
        return {...bookData, count: book.count};
    });
    booksInCart.forEach(book => {
        const div = bookTemplate.content.cloneNode(true);
        const title = div.querySelector('[data-title]');
        const count = div.querySelector('[data-count]');
        const image = div.querySelector('[data-image]');
        const price = div.querySelector('[data-price]');
        const button = div.querySelector('[data-remove]');
        title.innerText = book.title;
        count.innerText = book.count;
        image.src = book.img;
        price.innerText = book.price.toFixed(2) + ' €';
        button.dataset.id = book.id;
        booksDiv.appendChild(div);
    });
    cartAddEventListeners();
}

init();