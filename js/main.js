import translations from "./translations.js";

let darkMode = localStorage.getItem("darkMode");
const 
    darkModeToggle = document.querySelector("#dark-mode-toggle"),
    toTopBtn = document.createElement("div"); // Create scroll to top button

const languageSelector = document.querySelector("select");

languageSelector.addEventListener("change", (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
})

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(localStorage.getItem("lang"));
})

const setLanguage = (language) => {
    const allContent = document.querySelectorAll("[data-i18n]");
    allContent.forEach((singleContent) => {
        const translationKey = singleContent.getAttribute("data-i18n");
        singleContent.innerHTML = translations[language][translationKey];
    })
    if (language === "ar") {
        document.dir = "rtl";
        document.lang = "ar";
    } else {
        document.dir = "ltr";
        document.lang = "en";
    }
}

const enableDarkMode = () => {
    // add the class darkmode to the body
    document.body.classList.add("darkmode");
    // update the dark mode in the local storage
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.innerHTML = `<i class="fa-solid fa-toggle-on fa-2xl"></i>`;
}

const disableDarkMode = () => {
    // add the class darkmode to the body
    document.body.classList.remove("darkmode");
    // update the dark mode in the local storage
    localStorage.setItem('darkMode', null);
    darkModeToggle.innerHTML = `<i class="fa-solid fa-toggle-off fa-2xl"></i>`;
}

if (darkMode === "enabled") {
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function toTop() { // scroll to top with smooth behavior
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function startAfter(myElementa, myStyle, time) { // set the display style of an item after specific time
    setTimeout(function () {
        myElementa.style.display = myStyle;
    }, time);
}

// to top button
toTopBtn.classList = "toTopBtn";
toTopBtn.setAttribute("title", "To Top");
toTopBtn.setAttribute("id", "toTop");
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", function () { // when scroll show the toTopByn, else hide it.
    (window.scrollY > 50) ? startAfter(toTopBtn, "block", 0) : startAfter(toTopBtn, "none", 0);
})

toTopBtn.addEventListener("click", function() { // when click the toTopBtn call the toTop helper function
    toTop();
})