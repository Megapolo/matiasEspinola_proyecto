const selectElement = document.getElementById('prov');
const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\S]{8,}$/;
const isPhone = /^[0-9]{5,20}$/;
const validationSpan = document.getElementById("validationSpan");
const getButton = document.getElementById("btn")


getButton.setAttribute("disabled", "true");

const RegisterInputValidation = () => {
  const email = document.getElementById("mail").value; 
  const confPassword = document.getElementById("confPassword").value;
  const password = document.getElementById("password").value;
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("lastname").value;
  const telefono = document.getElementById("contactnumber").value;


  let errors = [];

  if (email && email.length > 3) {
      if (!isEmail.test(email)) {
          errors.push("Por favor ingrese un correo electrónico válido.");
        }
    }

  if (password && password.length > 1) {
      if (!isPassword.test(password)) {
          errors.push("La contraseña debe tener al menos 8 caracteres, una letra, un caracter especial y un número.");
      }
    }
    
  if (confPassword && password) {
    if (confPassword !== password) {
      errors.push("Las contraseñas no coinciden.");
    }
  }

  if (nombre && nombre.length > 1) {
    if (nombre.length > 20) {
      errors.push("El nombre debe tener entre 2 y 20 caracteres");
    }
  }

  if (apellido && apellido.length > 1) {
    if (apellido.length > 20) {
      errors.push("El apellido debe tener entre 2 y 20 caracteres.");
    }
  }

  if (telefono) {
    if (!isPhone.test(telefono)) {
      errors.push("El número de contacto debe tener entre 5 y 20 caracteres y estár compuesto unicamente por números.");
    }
  }

  console.log(errors.length)

  if (errors.length > 0) {
    const listItems = errors.map(err => `<li>${err}</li>`).join('');
    validationSpan.innerHTML = `<ul>${listItems}</ul>`;
    getButton.setAttribute("disabled", "true");
    getButton.style.cursor = "not-allowed";
    
  } else {
    validationSpan.style.backgroundColor = "rgb(226,226,226)";
    validationSpan.innerHTML = "";
    if (nombre&&apellido&&telefono&&email&&password&&confPassword) {
      getButton.removeAttribute("disabled");
      getButton.style.cursor = "pointer";
    }
  }
}


selectElement.addEventListener('change', () => {
  if (selectElement.value !== "") {
    selectElement.classList.add('changed');
  } else {
    selectElement.classList.remove('changed');
  }
});