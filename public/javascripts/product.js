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

//const btnLeft = document.querySelector(".fa-arrow-left")
//const btnRight = document.querySelector(".fa-arrow-right")
//const destacados = document.querySelector(".destacados")

//btnRight.addEventListener("click", () => destacados.scrollLeft += 300 )
//btnLeft.addEventListener("click", () => destacados.scrollLeft -= 300 )