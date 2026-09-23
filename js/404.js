const terminal = document.querySelector("#terminal");
const astronaute = document.querySelector("#astronaute");
const compteur = document.querySelector("#compteur");
const boutonRetour = document.querySelector("#retour");
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const messagesAstronaute = [
    "Tu as poussé l'astronaute. Il tourne sur lui-même.",
    "Encore ? Il commence à avoir le tournis…",
    "Il te demande gentiment d'arrêter.",
    "Il a le mal de l'espace maintenant.",
    "Bon, il part chercher la page tout seul 🚀"
];

let nombrePoussees = 0;

function creerEtoiles(nombre) {
    const ciel = document.querySelector(".etoiles");

    for (let i = 0; i < nombre; i++) {
        const etoile = document.createElement("span");
        const taille = Math.random() * 2 + 1;

        etoile.className = "etoile";
        etoile.style.width = taille + "px";
        etoile.style.height = taille + "px";
        etoile.style.top = Math.random() * 100 + "%";
        etoile.style.left = Math.random() * 100 + "%";
        etoile.style.setProperty("--duree", (Math.random() * 3 + 2) + "s");
        etoile.style.setProperty("--delai-etoile", (Math.random() * 3) + "s");

        ciel.appendChild(etoile);
    }
}

function lignesTerminal() {
    let chemin = window.location.pathname;

    try {
        chemin = decodeURIComponent(chemin);
    } catch (erreur) {
    }

    return [
        "> Recherche de « " + chemin + " »…",
        "> Connexion au serveur de l'IUT… OK",
        "> Exploration des dossiers… rien trouvé",
        "> Erreur 404 : page introuvable",
        "> Conseil : retourne à l'accueil 🚀"
    ];
}

function ecrireTerminal() {
    const texte = lignesTerminal().join("\n");
    const zoneTexte = document.createTextNode("");
    const curseur = document.createElement("span");

    curseur.className = "curseur";
    terminal.textContent = "";
    terminal.appendChild(zoneTexte);
    terminal.appendChild(curseur);

    if (mouvementReduit) {
        zoneTexte.data = texte;
        return;
    }

    let position = 0;

    function taperCaractere() {
        zoneTexte.data += texte[position];
        position++;

        if (position < texte.length) {
            const pause = texte[position - 1] === "\n" ? 350 : 25;
            setTimeout(taperCaractere, pause);
        }
    }

    setTimeout(taperCaractere, 800);
}

function pousserAstronaute() {
    astronaute.classList.remove("pousse");
    void astronaute.offsetWidth;
    astronaute.classList.add("pousse");

    const index = Math.min(nombrePoussees, messagesAstronaute.length - 1);
    compteur.textContent = messagesAstronaute[index];
    nombrePoussees++;
}

function pagePrecedente() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/";
    }
}

astronaute.addEventListener("click", pousserAstronaute);

astronaute.addEventListener("animationend", function (evenement) {
    if (evenement.animationName === "tourbillon") {
        astronaute.classList.remove("pousse");
    }
});

boutonRetour.addEventListener("click", pagePrecedente);

creerEtoiles(90);
ecrireTerminal();
