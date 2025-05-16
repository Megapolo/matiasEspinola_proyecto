let spanCantidad = document.querySelector('span.badge'); // Cantidad en el ícono del carrito
let changuito = document.getElementById('changuito'); // Tabla de productos
let spanTotal = document.getElementById('total'); // Total en la tabla
let cartHead = document.getElementById('cart-head');
let cartFooter = document.getElementById('cart-footer');
let cartEmpty = document.getElementById('cart-empty');
let btnCartEmpty = document.getElementById('btn-delete-cart');
let btnNextBuy = document.getElementById('btn-next-buy');
let pesos = document.getElementById('pesos'); // Total pequeño (abajo del carrito)

const urlBase = window.origin + '/';

const mostrarCantidad = (carrito) => {
  let cantidad = 0;
  let total = 0;

  carrito.forEach(item => {
    cantidad += item.cantidad;
    total += item.total;
  });

  if (spanCantidad) spanCantidad.innerText = cantidad;
  if (spanTotal) spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`;
  if (pesos) pesos.innerText = `$${total}`;

  const vacio = cantidad === 0;

  if (cartHead) cartHead.style.display = vacio ? 'none' : 'table-header-group';
  if (cartFooter) cartFooter.style.display = vacio ? 'none' : 'table-footer-group';
  if (cartEmpty) cartEmpty.style.display = vacio ? 'block' : 'none';

  btnCartEmpty?.classList.toggle('disabled', vacio);
  btnNextBuy?.classList.toggle('disabled', vacio);
};

const cargarTabla = (carrito) => {
  if (!changuito) return;
  changuito.innerHTML = '';

  carrito.forEach(producto => {
    const row = `
      <tr>
        <td class="col-2"><img class="w-100" src="/images/${producto.image}" id="imgProduct"></td>
        <td class="text-center col-3 align-middle">
          <a class="text-danger h5" onclick="removeItem(event, ${producto.id})"><i class="fas fa-minus-square"></i></a>
          <span class="h5">${producto.cantidad}</span>
          <a class="text-success h5" onclick="addItem(event, ${producto.id})"><i class="fas fa-plus-square"></i></a>
        </td>
        <td class="align-middle">${producto.nombre}</td>
        <td class="align-middle"><span>$</span><span class="float-end">${producto.precio}</span></td>
        <td class="align-middle"><span>$</span><span class="float-end">${producto.total}</span></td>
      </tr>
    `;
    changuito.innerHTML += row;
  });
};

const getCarrito = async () => {
  try {
    const response = await fetch(urlBase + 'api/carts/show');
    const result = await response.json();
    cargarTabla(result.data);
    mostrarCantidad(result.data);
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
  }
};

const addItem = async (e, id) => {
  e.preventDefault();
  try {
    const response = await fetch(urlBase + 'api/carts/add/' + id);
    const result = await response.json();
    cargarTabla(result.data);
    mostrarCantidad(result.data);
  } catch (error) {
    console.error('Error al agregar item:', error);
  }
};

const removeItem = async (e, id) => {
  e.preventDefault();
  try {
    const response = await fetch(urlBase + 'api/carts/remove/' + id);
    const result = await response.json();
    cargarTabla(result.data);
    mostrarCantidad(result.data);
  } catch (error) {
    console.error('Error al remover item:', error);
  }
};

const emptyCart = async () => {
  try {
    const response = await fetch(urlBase + 'api/carts/empty');
    const result = await response.json();
    if (changuito) changuito.innerHTML = '';
    mostrarCantidad(result.data);
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
  }
};

btnCartEmpty?.addEventListener('click', () => emptyCart());
getCarrito();
