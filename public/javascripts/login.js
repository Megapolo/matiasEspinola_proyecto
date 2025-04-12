const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
const validationSpan = document.getElementById("validations");
const getButton = document.getElementById("btn")

const validateAll = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let errors = [];

  if (email) {
      if (!isEmail.test(email)) {
          errors.push("Por favor ingrese un correo electrónico válido.");
        }
    }
    
    if (password) {
        if (!isPassword.test(password)) {
            errors.push("La contraseña debe tener al menos 2 caracteres, una letra y un número.");
        }
    }
    
    if (errors.length > 0) {
      validationSpan.style.backgroundColor = "rgb(248, 160, 160)"; 
    } else {
      validationSpan.style.backgroundColor = "rgb(226,226,226)"; 
    }

    if (errors.length === 0 && email && password) {
      getButton.removeAttribute("disabled"); 
    } else {
      getButton.setAttribute("disabled", "true");
      getButton.style.cursor = "not-allowed"; 
    }

  validationSpan.innerHTML = errors.join("<br>");
};