const abrir = document.querySelector('#carrito');
const cartContainer = document.querySelector('#cart-container');
const cerrar = document.querySelector('#close-cart');

abrir.addEventListener('click', () => {
    cartContainer.classList.remove("hidden")
})

cerrar.addEventListener('click', () => {
    cartContainer.classList.add("hidden")
})

