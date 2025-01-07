const btnLeft = document.querySelector(".fa-arrow-left")
const btnRight = document.querySelector(".fa-arrow-right")
const destacados = document.querySelector(".destacados")

btnRight.addEventListener("click", () => destacados.scrollLeft += 300 )
btnLeft.addEventListener("click", () => destacados.scrollLeft -= 300 )