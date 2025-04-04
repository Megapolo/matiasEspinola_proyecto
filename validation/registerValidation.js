const { body } = require('express-validator');
const { User } = require('../database/models');

module.exports = [
  // Email
  body('email')
    .notEmpty().withMessage('El campo "E-mail" no puede estar vacío.')
    .isEmail().withMessage('El correo electrónico no es válido.')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error('Ya existe una cuenta con ese E-mail');
      }
      return true;
    }),

  // Password
  body('password')
    .notEmpty().withMessage('El campo "Contraseña" no puede estar vacío.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/)
    .withMessage('La contraseña debe tener entre 8 y 20 caracteres, incluir una minúscula, una mayúscula, un número y un carácter especial.'),

  // Confirmación de password
  body('confPassword')
    .notEmpty().withMessage('El campo "Confirmar contraseña" no puede estar vacío.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden.');
      }
      return true;
    }),

  // Nombre
  body('name')
    .notEmpty().withMessage('El campo "Nombre" no puede estar vacío.')
    .isAlpha().withMessage('No se permiten números o caracteres especiales en el nombre.')
    .isLength({ min: 5, max: 20 }).withMessage('El nombre debe tener entre 5 y 20 caracteres.'),

  // Apellido
  body('lastname')
    .notEmpty().withMessage('El campo "Apellido" no puede estar vacío.')
    .isAlpha().withMessage('No se permiten números o caracteres especiales en el apellido.')
    .isLength({ min: 5, max: 20 }).withMessage('El apellido debe tener entre 5 y 20 caracteres.'),

  // Teléfono
  body('tel')
    .notEmpty().withMessage('El campo "Teléfono" no puede estar vacío.')
    .isNumeric().withMessage('El campo "Teléfono" debe contener solo números.')
    .isLength({ min: 5, max: 15 }).withMessage('El teléfono debe tener entre 5 y 15 dígitos.'),
];
