const abrir = document.querySelector('#carrito');
const cartContainer = document.querySelector('#cart-container');
const cerrar = document.querySelector('#close-cart');
const cartItems = document.querySelector('#cartItems');


abrir.addEventListener('click', () => {
  cartContainer.classList.remove("hidden");
  cartContainer.classList.remove("displayOff")
});

cerrar.addEventListener('click', () => {
    cartContainer.classList.add("hidden")
    cartContainer.classList.add("displayOff")
})




