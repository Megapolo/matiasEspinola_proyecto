const path = require("path");
const directory = path.join(__dirname, "../data/users.json");
const { validationResult } = require("express-validator");
const {
  readFile,
  writeFile,
  parseFile,
  stringifyFile,
} = require("../utilities/filesystem");

const users = parseFile(readFile(directory));

const register = (req, res, next) => {
  res.render('users/register',{ title: 'Registro' });
};

const store = (req, res, next) => {
  const errors = validationResult(req).mapped();
  if (!validationResult(req).isEmpty()) {
    console.log(errors.mail)
    return res.render("users/register", { title: "Registro", errors });
  }
  const {mail,password,name,lastname} = req.body
  users.push({mail, password,name,lastname})
  writeFile(directory,stringifyFile(users)) 
  res.redirect("/users/login")
}

const load = function (req, res, next){
  res.render('users/login', {title: 'Login'})
}

const login = function (req, res, next) {
  const user = req.body.mail.toUpperCase()
  const usuario = dB.filter(element => element.username.toUpperCase() == user)
  if (usuario.password == req.body.password) {
    res.render('usuario/profile', {title: 'Login', usuario})
  } else {
  let error = "usuario o contraseña incorrectos"
  res.render('usuario/login', {title: 'Login', error})
  }
}

const admin = function (req, res, next) {
  res.render('admin/admin', {title:'Administrador'})
}
module.exports = {register, store, load, login, admin}
