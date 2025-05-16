const db = require("../../database/models");
const { User } = db;
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
      // Fetch de provincias
    const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
    if (!response.ok) {
      throw new Error("Error al obtener provincias");
    }
    const data = await response.json();
    const provincias = data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));

      res.render('users/register',{ title: 'Registro', provincias });
  } catch (error) {
    console.error("Error al cargar provincias y localidades: ", error);
    return res.status(500).render("error", { error, message: "Hubo un error al cargar provincias y localidades." });
  }

};

const store = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  const { email, password, name, lastname, tel, provincia, location, address } = req.body;

  if (!validationResult(req).isEmpty()) {
    try {
      const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
      const data = await response.json();
      const provincias = data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));

      return res.render("users/register", {
        title: "Registro",
        errors,
        email,
        password,
        name,
        tel,
        lastname,
        provincias
      });
    } catch (error) {
      console.error("Error al cargar provincias:", error);
      return res.status(500).render("error", {
        error,
        message: "Error al cargar provincias"
      });
    }
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hash,
      name,
      lastname,
      tel,
      provincia,
      localidad: location,
      address,
      rolId: 2,
      code: '',
      img: ''
    });

    res.redirect("/users/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).render("error", {
      error,
      message: "Hubo un error al registrar el usuario."
    });
  }
};



const load = function (req, res, next){
  res.render('users/login', {title: 'Login'})
}

const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.render("users/login", {
      title: "Login",
      errors: errores.mapped(),
      email,
    });
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("users/login", {
        title: "Login",
        errors: { email: { msg: "El usuario no existe" } },
        email,
      });
    }
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.render("users/login", {
        title: "Login",
        errors: { password: { msg: "Contraseña incorrecta" } },
        email,
      });
    }

    const { name, lastname, id, rolId, img } = user;
    req.session.user = { email, name, lastname, id, img, rolId };

    if (user.avatar) {
      req.session.user.img = user.img;
    }
    
    if (rememberMe) {
      res.cookie("user", { email, name, lastname, id }, { maxAge: 1000 * 60 * 30 });
    }
    if (rolId === 1) { // suponiendo que el rol admin tiene id 1
      return res.redirect("http://localhost:5173");
    } else {
      return res.redirect(`/users/profile/${id}`);
    }
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).send("Ocurrió un error interno.");
  }
};

const logout = (req, res) => {
  req.session.destroy()
  res.clearCookie('user')
  res.redirect('/users/login')
}

const goToCart = (req, res, next) => {
  res.render('products/cart', { title: "Carrito"})
}

const profile = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).render("error", { error: "Usuario no encontrado" });
    }

    // Fetch de provincias
    const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
    const data = await response.json();
    const provincias = Array.isArray(data.provincias) ? data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)) : [];

    if (provincias.length === 0) {
      throw new Error("No se encontraron provincias");
    }

    const idProvincia = user.provincia || provincias[0].id;

    // Fetch de localidades
    const responseLocalidades = await fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&max=500`
    );
    const dataLocalidades = await responseLocalidades.json();
    const localidades = Array.isArray(dataLocalidades.localidades) ? dataLocalidades.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)) : [];

    res.render("users/profile", {
      title: "Perfil",
      user,
      provincias,
      localidades,
    });
  } catch (error) {
    console.error("Error al cargar perfil: ", error);
    res.render("error", { error, message: "Hubo un error al cargar el perfil." });
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedData = {
      ...req.body,
      img: req.file ? "/images/users/" + req.file.filename : user.avatar
    };

    if (req.body.contrasena && req.body.contrasena2) {
      if (req.body.contrasena === req.body.contrasena2) {
        updatedData.password = await bcrypt.hash(req.body.contrasena, 10);
      } else {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
      }
    } else {
      updatedData.password = user.password; 
    }
    delete updatedData.contrasena2;


      req.session.user.img = updatedData.img;
    

    await user.update(updatedData);

    res.redirect(`/users/profile/${id}`);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).render("error", { error, message: "Error al actualizar los datos del perfil" });
  }
};

module.exports = {register, store, load, login, profile, logout, update, goToCart}
