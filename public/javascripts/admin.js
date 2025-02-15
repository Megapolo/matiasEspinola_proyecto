const elements = {
    products: document.querySelector('.products'),
    users: document.querySelector('.users'),
    productType: document.querySelector('#productType'),
    productNew: document.querySelector('.newArticle'),
    usersInput: document.querySelector('.inputForm'),
    productName: document.querySelector('.inputProduct'),
    productList: document.querySelector('#productList'),
    usersList: document.querySelector('#usersList'),
};

const HIDDEN_CLASS = 'hidden';

const toggleHidden = (element) => element.classList.toggle(HIDDEN_CLASS);

const ensureHidden = (element) => {
    if (!element.classList.contains(HIDDEN_CLASS)) {
        element.classList.add(HIDDEN_CLASS);
    }
};

const ensureVisible = (element) => {
    if (element.classList.contains(HIDDEN_CLASS)) {
        element.classList.remove(HIDDEN_CLASS);
    }
};

const productToDo = () => {
    toggleHidden(elements.productType);
    toggleHidden(elements.productName);
};


const productNewToggle = () => {
    ensureHidden(elements.productNew);
};

const selectType = (value) => {
    const isProduct = value === 'producto';
    const isUser = value === 'usuario';

    if (isProduct) {
        toggleHidden(elements.products);
        ensureHidden(elements.users);
        ensureHidden(elements.usersInput);
        ensureHidden(elements.productType);
        ensureHidden(elements.productList);
        ensureHidden(elements.usersList);
    } else if (isUser) {
        toggleHidden(elements.users);
        ensureHidden(elements.products);
        ensureHidden(elements.productType);
        ensureHidden(elements.productList);
        ensureHidden(elements.usersList);
        productNewToggle();
        ensureHidden(elements.usersInput);
    }
};

// Lógica principal para acciones específicas
const ToDo = (value) => {
    console.log(value);

    switch (value) {
        case 'editProduct':
        case 'seeProduct':
            ensureVisible(elements.productType);
            ensureVisible(elements.productList);
            ensureHidden(elements.usersList);
            productNewToggle();
            break;

        case 'addProduct':
            ensureHidden(elements.productType);
            ensureHidden(elements.productList);
            ensureHidden(elements.usersList);
            ensureVisible(elements.productNew);
            break;

        case 'editUser':
        case 'deleteUser':
            ensureHidden(elements.productType);
            productNewToggle();
            ensureVisible(elements.usersInput);
            ensureVisible(elements.usersList);
            ensureHidden(elements.productList)
            break;

        default:
            window.alert('No se como hiciste para que esto falle y llegue al default del switch');
            break;
    }
};

const descuento = document.getElementById('descuento')
const precio = document.getElementById('precio')
const total = document.getElementById('total')

descuento.addEventListener('change', function () {
    console.log('Dentro del evento')
    let precioValor = parseFloat(precio.value) || 0
    let descuentoValor = parseFloat(this.value) || 0

    if (descuentoValor !== 0) {
        console.log('Dentro del if del evento')
        let totalidad = precioValor - (precioValor * (descuentoValor / 100))
        total.classList.remove('hidden');
        total.innerText = `Total: ${totalidad.toFixed(2)}`
    } else {
        console.log('Dentro del else del evento')
        total.classList.add('hidden')
    }
});