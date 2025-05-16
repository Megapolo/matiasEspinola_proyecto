function increaseValue() {
    const input = document.getElementById('numericInput');
    const currentValue = parseInt(input.value) ;
    const max = parseInt(input.max);
  
    if (currentValue < max) {
      input.value = currentValue + 1;
    }
    console.log(input.value);
  }

function decreaseValue () {
    const input = document.getElementById('numericInput');
    const currentValue = parseInt(input.value) ;
    const min = parseInt(input.min);

    if (currentValue > min) {
        input.value = currentValue-1
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnAddToCart = document.getElementById("toCart");
  const productIdSpan = document.getElementById("productID");

  if (btnAddToCart && productIdSpan) {
    btnAddToCart.addEventListener("click", async () => {
      const productId = productIdSpan.textContent.trim();
      if (!productId) return;

      try {
        const response = await fetch(`/api/carts/add/${productId}`);
        const result = await response.json();

        // Estas funciones ya están definidas en cartLogic.js
        if (window.cargarTabla && window.mostrarCantidad) {
          cargarTabla(result.data);
          mostrarCantidad(result.data);
        } else {
          console.warn("No se encontró cargarTabla o mostrarCantidad.");
        }

      } catch (error) {
        console.error("Error al añadir al carrito:", error);
      }
    });
  }
});



//const btnLeft = document.querySelector(".fa-arrow-left")
//const btnRight = document.querySelector(".fa-arrow-right")
//const destacados = document.querySelector(".destacados")

//btnRight.addEventListener("click", () => destacados.scrollLeft += 300 )
//btnLeft.addEventListener("click", () => destacados.scrollLeft -= 300 )