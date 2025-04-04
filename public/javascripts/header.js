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

const savedTheme = localStorage.getItem("darkMode");
if (savedTheme === "enabled") {
    document.querySelector("header").classList.add("header-dark-mode");
    document.querySelector("main").classList.add("main-dark-mode");
    document.querySelector("footer").classList.add("footer-dark-mode");
} else {
    document.querySelector("header").classList.remove("header-dark-mode");
    document.querySelector("main").classList.remove("main-dark-mode");
    document.querySelector("footer").classList.remove("footer-dark-mode");
    localStorage.setItem("darkMode", "disabled");
}
