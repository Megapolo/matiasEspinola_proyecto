const fs = require('../utilities/filesystem')
const pathProductData = '../data/productos.json'
const pathUsersData = '../data/users.json'

const PRODUCTS = [{showProducts: (req, res, next) => {
    const dbProducts = fs.readFile(pathProductData)
    res.render('admin/admin_product', {title:"Administrador de productos", dbProducts})
}},
{addProduct: (req, res, next) => {
    const {nombre,fabricante,tipo,precio,img} = req.body.add
    const product = {nombre,fabricante,tipo,precio,img}
    const dbProducts = fs.readFile(pathProductData)
    let id = 1 
    dbProducts.forEach(element => {
       if (id <= element.id) {
            id++
        } return id
    });
    product.id = id
    let data = fs.stringifyFile(product)
    fs.writeFile(pathProductData,data)
}},
{removeProduct: (req, res, next) => {
    const {id,nombre} = req.body.remove
    const product = {id,nombre}
    let dbProducts = fs.readFile(pathProductData)
    dbProducts = fs.parseFile(dbProducts)
    if (product.nombre && !product.id) {
        dbProducts.forEach(element => {
            if (element.nombre == product.nombre) {
                product.id == element.id
            }});
    } else if (!product.nombre && !product.id){ res.render('admin/admin_error', {msg: "please fill the blanks"}) }
    dbProducts = dbProducts.filter(element => element.id != product.id)
    fs.writeFile(pathProductData,fs.stringifyFile(dbProducts))
}},
{editProduct: (req, res, next) => {
    const {id,nombre,tipo,fabricante,precio,img} = req.body.edit
    const product = {id,nombre,tipo,fabricante,precio,img}
    let dbProducts = fs.readFile(pathProductData)
    dbProducts = fs.parseFile(dbProducts)
    dbProducts.forEach (element => {
        if (element.id == product.id) {
            element.nombre = product.nombre
            element.tipo = product.tipo
            element.fabricante = product.fabricante
            element.precio = product.precio
            element.img = product.img
        }
    })
    fs.writeFile(pathProductData,fs.stringifyFile(dbProducts))   
}}]

const USERS = [{showUsers: (req, res, next) => {
    const dbUsers = fs.readFile(pathUsersData)
    res.render('admin/admin_user', {title:"Administrador de usuarios", dbUsers})
}},
{removeUser: (req, res, next) => {
    const {id,nombre} = req.body.removeUser
    const user = {id,nombre}
    let dbUsers = fs.readFile(pathUsersData)
    dbUsers = fs.parseFile(dbUsers)
    if (product.nombre && !product.id) {
        dbUsers.forEach(element => {
            if (element.nombre == user.nombre) {
                user.id == user.id
            }});
    } else if (!user.nombre && !user.id){ res.render('admin/admin_error', {msg: "please fill the blanks"}) }
    dbUsers = dbUsers.filter(element => element.id != user.id)
    fs.writeFile(pathUsersData,fs.stringifyFile(dbUsers))
}},
{editUser: (req, res, next) => {
    const {id,nombre} = req.body.edit
    const user = {id,nombre,tipo,fabricante,precio,img}
    let dbUsers = fs.readFile(pathUsersData)
    dbUsers = fs.parseFile(dbUsers)
    dbUsers.forEach (element => {
        if (element.id == user.id) {
            element.nombre = user.nombre
        }
    })  
    fs.writeFile(pathUsersData,fs.stringifyFile(dbUsers))  
}}]


module.exports = {PRODUCTS,USERS}