

const DarkMode = () => {
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
        localStorage.getItem("darkMode")
    } 
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("button-on-off");
    const header = document.header
    const main = document.main
    const footer = document.footer

    // Verifica si el modo oscuro está activado en el almacenamiento local
    if (localStorage.getItem("darkMode") === "enabled") {
        header.classList.add("header-dark-mode");
        main.classList.add("main-dark-mode");
        footer.classList.add("footer-dark-mode");
    }

    if (!toggleButton) {
        console.log("Error, no se encontro el botón en el DOM");
        return
    }

    toggleButton.addEventListener("click", () => {
        header.classList.toggle("header-dark-mode");
        main.classList.toggle("main-dark-mode");
        footer.classList.toggle("footer-dark-mode");

        // Guarda la preferencia en LocalStorage
        if (main.classList.contains("main-dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
