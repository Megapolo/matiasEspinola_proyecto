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

const users = parseFile(readFile(directory));

const register = (req, res, next) => {
  res.render('users/register',{ title: 'Registro'});
};

const store = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  const {email,password,name,lastname,tel} = req.body
  if (!validationResult(req).isEmpty()) {
    console.log(errors.email)
    return res.render("users/register", { title: "Registro", errors, email, password, name, tel, lastname});
  }
  const hash = await bcrypt.hash(password, 10)
  users.push({email, password:hash, name, lastname, tel, status:'user'})
  await writeFile(directory,stringifyFile(users)) 
  res.redirect("/users/login")
}

const load = function (req, res, next){
  res.render('users/login', {title: 'Login'})
}

const login = (req, res, next) => {
  const { email } = req.body;
  const errores = validationResult(req);
  if (errores.array().length > 0) {
    res.render("users/login", { title: login,errors: errores.mapped(),email});
  } else {
    const user = users.find(element => element.email === email);
    const { name, lastname } = user;
    req.session.user = { email, name, lastname };
    if (user.status == 'admin') {
      res.redirect("/admin");
    } else {
      res.redirect("/users/profile");
    }
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.clearCookie('user')
  res.redirect('/users/login')
}



const profile = function (req, res, next) {
  const {name,lastname} =  req.session.user
  res.render('users/profile', {title: 'Perfil de usuario', name, lastname})
}
module.exports = {register, store, load, login, profile, logout}
