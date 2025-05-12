const getButton = document.getElementById("btnEdit")
const getForm = document.getElementById("formulario")

const editValidation = () => {
    const errorList = document.getElementById("error-list");
    const getName = document.getElementById("name").value;
    const getManufacturer = document.getElementById("fabricante").value;
    const getCategory = document.getElementById("category").value;
    const getPrice = document.getElementById("precio").value;
    const getDiscount = document.getElementById("descuento").value;
    const getDescription = document.getElementById("descripcion").value;
    const getImage = document.getElementById("image").value;

    let errors = [];

    if (getName.length < 1 ) {
        errors.push("El nombre del producto no puede estar vacío.");
        console.log("error en nombre")
    }

    if (getManufacturer.length < 1 ) {
        errors.push("El fabricante no puede estar vacío.");
    }

    if (getCategory.length < 1 ) {
        errors.push("La categoría no puede estar vacía.");
    }

    if (getPrice.length < 1 ) {
        errors.push("El precio no puede estar vacío.");
    }   

    if (getDiscount > 80 ) {
        errors.push("El descuento no puede ser mayor a 80%");
    }   

    if (getDescription.length < 1 ) {
        errors.push("La descripción no puede estar vacía.");
    } 

    if (errors.length > 0) {
        errorList.innerHTML = "";
        errors.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error; 
            errorList.appendChild(li);
            getButton.setAttribute("disabled", "true"); 
        });
    } else {
        errorList.innerHTML = ""; 
        getButton.removeAttribute("disabled"); 
 
    }
}

const confirmEdit = (event) => {

    event.preventDefault();

    const confirmation = confirm("¿Estás seguro de que deseas editar este producto?");

    if (confirmation) {
        getForm.submit();
    } else {
        alert("Edición cancelada.");
    } 
}

const confirmNewProduct = (event) => {
    event.preventDefault();
    const getImage = document.getElementById("image").value;

    if(getImage.length < 1) {
        const confirmWithoutImage = confirm("¿Estás seguro de que deseas agregar este producto SIN imagen?");

        if (confirmWithoutImage) {
            getForm.submit();
        } else {
            alert("Accion cancelada.");
        }
        
    } else {
        const confirmation = confirm("¿Estás seguro de que deseas agregar este producto?");

        if (confirmation) {
            getForm.submit();
        } else {
            alert("Accion cancelada");
        } 
}
}