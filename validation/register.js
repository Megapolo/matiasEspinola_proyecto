const {body} = require('express-validator')
const fs = require("fs");
const dataBase = fs.readFileSync('data/users.json', 'utf-8');
const Users = JSON.parse(dataBase)

let pass = ''

module.exports = [
    body('mail').notEmpty().withMessage('El campo "E-mail" no puede estar vacio.')
    .isEmail().withMessage('El correo electronico no es valido.'),


    body('password').notEmpty().withMessage('El campo "Contraseña" no puede estar vacio.').bail()
    .custom((value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;
        console.log(body('password').value)
        if (!regex.test(value)) {
            throw new Error('La contraseña debe tener entre 8 y 20 caracteres, incluir una minúscula, una mayúscula, un número y un carácter especial.');
        } else {
            pass = value
            
        }return true
    }).bail(),


    body('confPassword').notEmpty().withMessage('El campo "Confirmar contraseña" no puede estar vacio.').bail()
    .custom((value) => {
        if (value != pass) {
            throw new Error('Las contraseñas no coinciden.')
        }
        return true
    }),


    body('name').notEmpty().withMessage('El campo "Nombre" no puede estar vacio.')
    .isAlpha().withMessage('No se permiten numeros o caracteres especiales.')
    .isLength({ min: 5, max: 20 }).withMessage('El minimo de  es caracters de "Nombre" es 5 y el maximo 10.').bail(),


    body('lastname').notEmpty().withMessage('El campo "Apellido" no puede estar vacio.').bail()
    .isAlpha().withMessage('No se permiten numeros o caracteres especiales.').bail()
    .isLength({ min: 5, max: 20 }).withMessage('El minimo de caracters de "Apellido" es 5 y el maximo 10.').bail(),


    body('tel').notEmpty().withMessage('El campo "Teléfono" no puede estar vacio.').bail()
    .isNumeric().withMessage('El formato de "Teléfono" tiene que ser numerico.').bail()
    .isLength({min: 5, max: 15}).withMessage('La cantidad de caracteres del campo "Teléfono no cumple los requisitos.')
]
