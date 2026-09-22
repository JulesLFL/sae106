const header = document.querySelector("header");
const burger = document.querySelector(".burger");
const liensMenu = document.querySelectorAll("a.navi");

function ouvrirMenu() {
    header.classList.add("menu-ouvert");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
}

function fermerMenu() {
    header.classList.remove("menu-ouvert");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
}

function basculerMenu() {
    if (header.classList.contains("menu-ouvert")) {
        fermerMenu();
    } else {
        ouvrirMenu();
    }
}

function marquerPageActive() {
    const pageActuelle = window.location.pathname.split("/").pop() || "index.html";

    liensMenu.forEach(function (lien) {
        const pageLien = lien.getAttribute("href").split("/").pop();
        if (pageLien === pageActuelle) {
            lien.setAttribute("aria-current", "page");
        }
    });
}

function afficherAnnee() {
    const annee = document.querySelector("#annee");
    if (annee) {
        annee.textContent = new Date().getFullYear();
    }
}

burger.addEventListener("click", basculerMenu);

liensMenu.forEach(function (lien) {
    lien.addEventListener("click", fermerMenu);
});

document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape") {
        fermerMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        fermerMenu();
    }
});

marquerPageActive();
afficherAnnee();
