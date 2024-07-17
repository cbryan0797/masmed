document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productElement = event.target.closest('.medicamentos');
        const productId = productElement.getAttribute('data-id');
        const productTitle = productElement.getAttribute('data-title');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(product => product.id === productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            const product = {
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productTitle} agregado al carrito.`);
    }
});

document.getElementById('checkout').addEventListener('click', () => {
    window.location.href = 'pago.html';
});

// mostrar contenido en la pagina de carrito

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();

    function loadCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="cart-item-details">
                    <h3>${product.title}</h3>
                    <p>Precio: $${product.price.toFixed(2)}</p>
                    <label>Cantidad: 
                        <input type="number" class="quantity" value="${product.quantity}" data-id="${product.id}" min="1">
                    </label>
                    <p>Total: $<span class="item-total">${(product.price * product.quantity).toFixed(2)}</span></p>
                    <button class="remove-item" data-id="${product.id}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(productElement);
            subtotal += product.price * product.quantity;
        });

        document.getElementById('subtotal').innerText = subtotal.toFixed(2);
        const itbms = subtotal * 0.00;
        document.getElementById('itbms').innerText = itbms.toFixed(2);
        document.getElementById('total').innerText = (subtotal + itbms).toFixed(2);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });

        document.querySelectorAll('.quantity').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.getAttribute('data-id');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }

    function updateQuantity(event) {
        const productId = event.target.getAttribute('data-id');
        const newQuantity = parseInt(event.target.value);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity = newQuantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
});


