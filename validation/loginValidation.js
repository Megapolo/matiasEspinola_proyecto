const {body} = require('express-validator')
const fs = require("fs");
const dataBase = fs.readFileSync('data/users.json', 'utf-8');
const users = JSON.parse(dataBase)
const bcrypt = require('bcrypt');
const { error } = require('console');

async function comparePass(pass, hash) {
    return await bcrypt.compare(pass, hash);
}

module.exports = [
    body('email').notEmpty().withMessage('El campo "E-mail" no puede estar vacio.')
    .isEmail().withMessage('El correo electronico no es valido.')
    .custom((value) => {
        const user = users.find(user => user.email == value);
        if (!user) {
            throw new Error('No existe una cuenta con ese E-mail');
        }
        return true;
    }).bail(),

    body('password').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/).withMessage("No cumple con los requisitos, debe contener una mayuscula, minuscula, un valor numerico y un caracter especial. La longitud debe ser entre 8 y 20 caracteres").bail()
        .custom(async (value, { req }) => {
            const user = users.find(element => element.email === req.body.email);

            
            const result = await comparePass(value, user.password);

            if (!result) {
                throw new Error('Las credenciales no son validas');
            }

            console.log("resultado de la comparación", result);


            return true;
        }).bail()
    ]