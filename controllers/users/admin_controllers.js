const { log } = require('console')
const {readFile,writeFile,parseFile,stringifyFile} = require('../../utilities/filesystem')
const path = require('path')
const pathProductData = path.join(__dirname + '/../../data/productos.json')
const { v4: uuidv4 } = require("uuid");

function showProducts () {
    return parseFile(readFile(pathProductData))
}

const render = (req, res, next) => {
    const products = showProducts()
    console.log(products)
    res.render('admin/admin', {title:'Admin', products})
}

const edit = (req, res) => {
    const id = req.params.id;
    const products = showProducts();
    const product = products.find(product => product.id == id);
    res.render('admin/admin_product',{ title : 'Edicion de producto', product});
}

const update = (req, res) => {
    const id = req.params.id;
    const product = req.body;
    console.log(product);
    product.id = id;
    const products = parseFile(readFile(pathProductData));
    const indice = products.findIndex(element => element.id == id);
    console.log("indice",indice);
    products[indice] = product;
    writeFile(pathProductData, stringifyFile(products));
    res.redirect('/admin/products');
}

const remove = (req, res) => {
    const id = req.params.id;
    const products = parseFile(readFile(pathProductData));
    const filteredProducts = products.filter(product => product.id != id);
    writeFile(pathProductData, stringifyFile(filteredProducts));
    res.redirect('/admin/products');
}

const renderNew = (req, res) => {
    res.render('admin/admin_new', {title : 'Nuevo producto'})
}

const addNew = (req, res) => {
    const product = req.body;
    product.id = uuidv4();
    const products = parseFile(readFile(pathProductData));
    products.push(product);
    writeFile(pathProductData, stringifyFile(products));
    res.redirect('/admin/products');
}


module.exports = {render, edit, update, remove, renderNew, addNew}