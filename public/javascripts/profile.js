let localidad = document.querySelector('#localidad'); 
let provincia = document.querySelector('#provincia');

provincia.addEventListener('change', async () => {
    let idProvincia = provincia.value; // Obtener el valor seleccionado
    console.log("ID de provincia seleccionado:", idProvincia); // Depuración

    if (!idProvincia) return; // Evitar hacer la petición si no hay un ID válido

    try {
        const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&max=500`);
        
        if (!response.ok) throw new Error("Error en la API");

        const data = await response.json();

        // Ordenamos las localidades alfabéticamente
        const localidades = data.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));

        // Limpiar todas las opciones anteriores
        localidad.innerHTML = ''; 

        // Agregar opción por defecto
        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione una localidad';
        localidad.appendChild(defaultOption);

        // Agregar nuevas opciones
        localidades.forEach(loc => {
            let option = document.createElement('option');
            option.value = loc.id;
            option.textContent = loc.nombre;
            localidad.appendChild(option);
        });

    } catch (error) {
        console.error('Error al obtener localidades:', error);
    }
});

const previewImage = (event, querySelector) => {
    const input = event.target;
    const file = input.files[0];
    const preview = document.querySelector(querySelector);
    preview.lastChild.src = '';

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.appendChild(document.createElement('img'));
            preview.lastChild.src = e.target.result;
            preview.lastChild.style.maxHeight = '200px';
            preview.lastChild.style.maxWidth = '250px';
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
    }
}
