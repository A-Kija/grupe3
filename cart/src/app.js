const URL = 'https://in3.dev/knygos/';
let cart = []; // priskyrimas tik dėl tipo deklaravimo. Deklaravimas tik dėl aiškumo.
let books = null; // null reiškia, kad dar nepasibaigė užklausa į serverį



const init = _ => { // iškart iškviečiamas, kai užkraunamas puslapis
    getBooks();
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    showCart();
}

const showCart = _ => {
    const cartIcon = document.querySelector('[data-cart-icon]');
    cartIcon.addEventListener('click', _ => {
        const dataCart = document.querySelector('[data-cart]');
        if (dataCart.dataset.cart === 'hide') {
            dataCart.dataset.cart = 'show';
        } else {
            dataCart.dataset.cart = 'hide';
        }
    });
}

const addToCart = (id, count) => {
    const bookInCart = cart.find(book => book.id === id);
    if (bookInCart) {
        bookInCart.count += count;
    } else {
        cart.unshift({id, count});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(true);
}

const removeFromCart = id => {
    cart = cart.filter(book => book.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const clearCart = _ => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const booksAddEventListeners = _ => {
    addButtons = document.querySelectorAll('[data-add]');
    valueInputs = document.querySelectorAll('[data-count]');
    addButtons.forEach(button => {
        button.addEventListener('click', _ => {
            const valueInput = button.closest('[data-book]').querySelector('[data-count]');
            addToCart(parseInt(button.dataset.id), parseInt(valueInput.value));
            valueInput.value = 1;
        });
    });
    valueInputs.forEach(input => {
        input.addEventListener('input', _ => {
            parseInt(input.value) < 1 && (input.value = 1); // taip galima parašyti if'ą vienoje eilutėje
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
    const clearButton = document.querySelector('[data-clear]');
    clearButton.addEventListener('click', clearCart);
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

const showCartTopCount = _ => {
    const cartCount = document.querySelector('[data-cart-top-count]');
    const count = cart.reduce((sum, book) => sum + book.count, 0);
    cartCount.innerText = count;
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

const renderCart = (show = false) => {
    const booksDiv = document.querySelector('[data-cart-list]');
    const bookTemplate = document.querySelector('[data-cart-template]');
    const totalPrice = document.querySelector('[data-cart-total-template]');
    const cartEmpty = document.querySelector('[data-cart-empty-template]');
    booksDiv.innerHTML = '';
    if (cart.length === 0) {
        const div = cartEmpty.content.cloneNode(true);
        booksDiv.appendChild(div);
        showCartTopCount();
        return;
    }
    const booksInCart = cart.map(bookInCart => {
        const bookData = books.find(bookData => bookData.id === bookInCart.id);
        return {...bookData, count: bookInCart.count, price: bookData.price * bookInCart.count};
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
    const totalDiv = totalPrice.content.cloneNode(true);
    const totalSum = booksInCart.reduce((sum, book) => sum + book.price, 0);
    const total = totalDiv.querySelector('[data-total-price]');
    total.innerText = totalSum.toFixed(2) + ' €';
    booksDiv.appendChild(totalDiv);
    cartAddEventListeners();
    showCartTopCount();
    show && (document.querySelector('[data-cart]').dataset.cart = 'show');
}

init();