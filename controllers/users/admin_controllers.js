const {readFile,writeFile,parseFile,stringifyFile} = require('../../utilities/filesystem')
const path = require('path')
const pathProductData = path.join(__dirname + '/../../data/productos.json')
const pathUsersData = path.join(__dirname + '/../../data/users.json')
const {searchProducts}= require('../products/search_controllers')

function showProducts () {
    return parseFile(readFile(pathProductData))
}

function showUsers () {
    return parseFile(readFile(pathUsersData))
}

const render = (req, res, next) => {
    const products = showProducts()
    const users = showUsers()
    console.log(products)
    res.render('admin/admin', {title:'Admin', products, users})
}



module.exports = {render}