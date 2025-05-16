const getButton = document.getElementById("btnEdit")
const getForm = document.getElementById("formulario")

const editValidation = () => {
    const errorList = document.getElementById("error-list");

    const getName = document.getElementById("name").value.trim();
    const getManufacturer = document.getElementById("fabricante").value.trim();
    const getCategory = document.getElementById("category").value;
    const getPrice = document.getElementById("precio").value.trim();
    const getDiscount = document.getElementById("descuento").value.trim();
    const getDescription = document.getElementById("descripcion").value.trim();

    let errors = [];

    if (getName.length < 1) {
        errors.push("El nombre del producto no puede estar vacío.");
    }

    if (getManufacturer.length < 1) {
        errors.push("El fabricante no puede estar vacío.");
    }

    if (!getCategory) {
        errors.push("La categoría no puede estar vacía.");
    }

    if (!getPrice || isNaN(getPrice)) {
        errors.push("El precio debe ser un número válido.");
    }

    if (getDiscount && (isNaN(getDiscount) || Number(getDiscount) > 80)) {
        errors.push("El descuento no puede ser mayor a 80% y debe ser un número válido.");
    }

    if (getDescription.length < 1) {
        errors.push("La descripción no puede estar vacía.");
    }

    // Limpiar lista
    errorList.innerHTML = "";

    if (errors.length > 0) {
        errors.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            errorList.appendChild(li);
        });
        getButton.setAttribute("disabled", "true");
    } else {
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