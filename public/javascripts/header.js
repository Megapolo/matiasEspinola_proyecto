const dark_mode = () => {
    let class_off = document.querySelector(".fa-toggle-off")
    let class_on = document.querySelector(".fa-toggle-on")
    let buttonMain = document.querySelector("main")
    let buttonFooter = document.querySelector("footer")
    let buttonHeader = document.querySelector("header")
    if ( class_off || class_on) {
        class_off.classList.toggle("hidden")
        class_on.classList.toggle("hidden")
        buttonMain.classList.toggle("main-dark-mode")
        buttonFooter.classList.toggle("footer-dark-mode")
        buttonHeader.classList.toggle("header-dark-mode")
    } 
}
