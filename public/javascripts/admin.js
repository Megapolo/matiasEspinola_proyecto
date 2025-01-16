const elements = {
    products: document.querySelector('.products'),
    users: document.querySelector('.users'),
    productType: document.querySelector('#productType'),
    productNew: document.querySelector('#newArticle'),
    usersInput: document.querySelector('.inputForm'),
    productName: document.querySelector('.inputProduct'),
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
    } else if (isUser) {
        toggleHidden(elements.users);
        ensureHidden(elements.products);
        ensureHidden(elements.productType);
        productNewToggle();
        ensureHidden(elements.usersInput);
    }
};

// Lógica principal para acciones específicas
const ToDo = (value) => {
    console.log(value);

    switch (value) {
        case 'editProduct':
        case 'deleteProduct':
            ensureVisible(elements.productType);
            productNewToggle();
            break;

        case 'addProduct':
            ensureHidden(elements.productType);
            ensureVisible(elements.productNew);
            break;

        case 'editUser':
        case 'deleteUser':
            ensureHidden(elements.productType);
            productNewToggle();
            ensureVisible(elements.usersInput);
            break;

        default:
            window.alert('No se como hiciste para que esto falle y llegue al default del switch');
            break;
    }
};