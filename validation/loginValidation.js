const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../database/models");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage('El campo "E-mail" no puede estar vacío.')
    .bail()
    .isEmail()
    .withMessage("El correo electrónico no es válido.")
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("No existe una cuenta con ese E-mail.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/)
    .withMessage(
      "No cumple con los requisitos: debe contener una mayúscula, minúscula, número y un carácter especial. Longitud entre 8 y 20."
    )
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        throw new Error("Usuario no encontrado.");
      }

      const isValid = await bcrypt.compare(value, user.password);

      if (!isValid) {
        throw new Error("Las credenciales no son válidas.");
      }

      return true;
    }),
];
