const path = require("path");
const directory = path.join(__dirname, "../../data/users.json");
const { validationResult } = require("express-validator");
const {
  readFile,
  writeFile,
  parseFile,
  stringifyFile,
} = require("../../utilities/filesystem");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const users = parseFile(readFile(directory));

const register = (req, res, next) => {
  res.render('users/register',{ title: 'Registro'});
};

const store = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  const {email,password,name,lastname,tel,provincia,location,postal,adress} = req.body
  if (!validationResult(req).isEmpty()) {
    console.log(errors.email)
    return res.render("users/register", { title: "Registro", errors, email, password, name, tel, lastname});
  }
  const hash = await bcrypt.hash(password, 10)
  users.push({id:uuidv4() ,email, password:hash, name, lastname, tel, status:'user', provincia, location, postal, adress})
  await writeFile(directory,stringifyFile(users)) 
  res.redirect("/users/login")
}

const load = function (req, res, next){
  res.render('users/login', {title: 'Login'})
}

const login = (req, res, next) => {
  const {email} = req.body;
  const errores = validationResult(req);
  if (errores.array().length > 0) {
    res.render("users/login", { title: 'Login', errors: errores.mapped(),email});
  } else {
    const user = users.find(element => element.email === email);
    const { name, lastname, id } = user;
    req.session.user = { email, name, lastname, id};
    if (req.body.rememberMe) {
      res.cookie("user", { email, name, lastname, id}, { maxAge: 1000 * 60 * 30 });
    }
    if (user.status == 'admin') {
      res.redirect("/admin/products");
    } else {
      res.redirect(`/users/profile/${id}`);
    }
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.clearCookie('user')
  res.redirect('/users/login')
}

const profile = async (req, res) => {
  const users = parseFile(readFile(directory));
  const id = req.params.id;
  try {

    const user = users.find((user) => user.id === id);
    const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");

    if (!response.ok) {
      throw new Error('Hubo un error en el fetch')
    }
    const data = await response.json()
    const provincias = data.provincias.sort((a,b) => a.nombre.localeCompare(b.nombre));
    const idProvincia = user.provincia ? user.provincia : provincias[0].id;

    const responseLocalidades = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&max=500`);
    const dataLocalidades = await responseLocalidades.json();
    const localidades = dataLocalidades.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));

    res.render("users/profile", { title: "Perfil", user, provincias, localidades });

} catch (error) {
  console.log("error: ", {error, message:'hola'});      
  res.render("error", {error, message:'hola'});
}

}

const update = (req, res) => {
  console.log("file: ", req.file);

  const users = parseFile(readFile(directory));
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  req.body.id = id;
  req.body.avatar = req.file ? req.file.filename : user.avatar;
  if (req.body.contrasena && req.body.contrasena2) {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
  } else {
    req.body.contrasena = user.contrasena;
  }

  delete req.body.contrasena2;

  const index = users.findIndex((user) => user.id === id);
  users[index] = req.body;

  writeFile(directory, stringifyFile(users));
  res.send(req.body);
}

module.exports = {register, store, load, login, profile, logout, update}
