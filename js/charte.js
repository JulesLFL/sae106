const CLE_STOCKAGE = "sae106-charte-signature";
const LARGEUR_BUREAU = 900;

const sommaire = document.querySelector("#sommaire");
const liensSommaire = document.querySelectorAll(".sommaire ol a");
const compteurLecture = document.querySelector("#compteur-lecture");
const barreLecture = document.querySelector("#barre-lecture");
const statutSignature = document.querySelector("#statut-signature");

const formulaire = document.querySelector("#formulaire-signature");
const champNom = document.querySelector("#nom");
const champPrenom = document.querySelector("#prenom");
const champDate = document.querySelector("#date-signature");
const caseAccord = document.querySelector("#accord");
const erreur = document.querySelector("#erreur-signature");
const zoneSignature = document.querySelector(".zone-signature");
const pad = document.querySelector("#pad-signature");
const boutonEffacer = document.querySelector("#effacer-pad");

const blocSignee = document.querySelector("#charte-signee");
const signeeNom = document.querySelector("#signee-nom");
const signeeDate = document.querySelector("#signee-date");
const signeeImage = document.querySelector("#signee-image");
const lienTelecharger = document.querySelector("#telecharger-signature");
const boutonAnnuler = document.querySelector("#annuler-signature");
const notification = document.querySelector("#notification");

const contexte = pad.getContext("2d");
let dessinEnCours = false;
let padRempli = false;
let minuteurNotification = null;

/* ---------- Sommaire ---------- */

function adapterSommaire() {
    sommaire.open = window.innerWidth > LARGEUR_BUREAU;
}

function suivreLecture() {
    const articlesLus = new Set();
    const total = liensSommaire.length - 1;
    const sections = [];

    liensSommaire.forEach(function (lien) {
        const section = document.querySelector(lien.getAttribute("href"));
        if (section) {
            sections.push({ section: section, lien: lien });
        }
    });

    function mettreAJourCompteur() {
        compteurLecture.textContent = articlesLus.size + " / " + total + " lus";
        barreLecture.style.width = (articlesLus.size / total) * 100 + "%";
    }

    function marquerActif() {
        const repere = window.innerHeight * 0.35;
        let actif = sections[0];

        sections.forEach(function (element) {
            if (element.section.getBoundingClientRect().top <= repere) {
                actif = element;
            }
        });

        sections.forEach(function (element) {
            if (element === actif) {
                element.lien.setAttribute("aria-current", "true");
            } else {
                element.lien.removeAttribute("aria-current");
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const observateur = new IntersectionObserver(function (entrees) {
            entrees.forEach(function (entree) {
                const assezVisible = entree.intersectionRatio >= 0.5
                    || entree.intersectionRect.height >= window.innerHeight * 0.4;
                if (!entree.isIntersecting || !assezVisible) {
                    return;
                }
                const element = sections.find(function (s) {
                    return s.section === entree.target;
                });
                element.lien.classList.add("lu");
                if (element.section.id !== "preambule") {
                    articlesLus.add(element.section.id);
                }
                mettreAJourCompteur();
                observateur.unobserve(entree.target);
            });
        }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

        sections.forEach(function (element) {
            observateur.observe(element.section);
        });
    }

    window.addEventListener("scroll", marquerActif, { passive: true });
    mettreAJourCompteur();
    marquerActif();
}

sommaire.addEventListener("toggle", function () {
    if (!sommaire.open && window.innerWidth > LARGEUR_BUREAU) {
        sommaire.open = true;
    }
});

liensSommaire.forEach(function (lien) {
    lien.addEventListener("click", function () {
        if (window.innerWidth <= LARGEUR_BUREAU) {
            sommaire.open = false;
        }
    });
});

/* ---------- Pavé de signature ---------- */

function preparerPad() {
    const ratio = window.devicePixelRatio || 1;
    const rect = pad.getBoundingClientRect();
    const ancienDessin = padRempli ? pad.toDataURL() : null;

    pad.width = rect.width * ratio;
    pad.height = rect.height * ratio;
    contexte.setTransform(ratio, 0, 0, ratio, 0, 0);
    contexte.lineWidth = 2.5;
    contexte.lineCap = "round";
    contexte.lineJoin = "round";
    contexte.strokeStyle = "#1f3a5f";

    if (ancienDessin) {
        const image = new Image();
        image.onload = function () {
            contexte.drawImage(image, 0, 0, rect.width, rect.height);
        };
        image.src = ancienDessin;
    }
}

function position(evenement) {
    const rect = pad.getBoundingClientRect();
    return { x: evenement.clientX - rect.left, y: evenement.clientY - rect.top };
}

function commencerTrait(evenement) {
    evenement.preventDefault();
    pad.setPointerCapture(evenement.pointerId);
    dessinEnCours = true;
    zoneSignature.classList.add("active");

    const point = position(evenement);
    contexte.beginPath();
    contexte.moveTo(point.x, point.y);
    contexte.lineTo(point.x + 0.1, point.y + 0.1);
    contexte.stroke();
}

function continuerTrait(evenement) {
    if (!dessinEnCours) {
        return;
    }
    const point = position(evenement);
    contexte.lineTo(point.x, point.y);
    contexte.stroke();

    if (!padRempli) {
        padRempli = true;
        zoneSignature.classList.add("remplie");
        zoneSignature.classList.remove("invalide");
    }
}

function terminerTrait() {
    dessinEnCours = false;
    zoneSignature.classList.remove("active");
}

function effacerPad() {
    contexte.clearRect(0, 0, pad.width, pad.height);
    padRempli = false;
    zoneSignature.classList.remove("remplie");
}

/* ---------- Signature ---------- */

function dateDuJour() {
    return new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function imageSignature() {
    const copie = document.createElement("canvas");
    copie.width = pad.width;
    copie.height = pad.height;

    const ctx = copie.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, copie.width, copie.height);
    ctx.drawImage(pad, 0, 0);

    return copie.toDataURL("image/png");
}

function verifierFormulaire() {
    const problemes = [];

    [champNom, champPrenom].forEach(function (champ) {
        const vide = champ.value.trim() === "";
        champ.setAttribute("aria-invalid", vide ? "true" : "false");
    });

    if (champNom.value.trim() === "" || champPrenom.value.trim() === "") {
        problemes.push("indique ton nom et ton prénom");
    }
    if (!padRempli) {
        problemes.push("dessine ta signature");
        zoneSignature.classList.add("invalide");
    }
    if (!caseAccord.checked) {
        problemes.push("coche la case d'engagement");
    }

    if (problemes.length > 0) {
        erreur.textContent = "Pour signer, " + problemes.join(", ") + ".";
        return false;
    }

    erreur.textContent = "";
    return true;
}

function lireSignature() {
    try {
        return JSON.parse(localStorage.getItem(CLE_STOCKAGE));
    } catch (e) {
        return null;
    }
}

function enregistrerSignature(signature) {
    try {
        localStorage.setItem(CLE_STOCKAGE, JSON.stringify(signature));
    } catch (e) {
    }
}

function supprimerSignature() {
    try {
        localStorage.removeItem(CLE_STOCKAGE);
    } catch (e) {
    }
}

function afficherSignee(signature) {
    const nomComplet = signature.prenom + " " + signature.nom;

    signeeNom.textContent = nomComplet;
    signeeDate.textContent = signature.date;
    signeeImage.src = signature.image;
    signeeImage.alt = "Signature de " + nomComplet;
    lienTelecharger.href = signature.image;

    formulaire.hidden = true;
    blocSignee.hidden = false;

    statutSignature.classList.add("signee");
    statutSignature.querySelector("i").className = "fa-solid fa-circle-check";
    statutSignature.querySelector("span").textContent = "Charte signée";
}

function afficherFormulaire() {
    formulaire.reset();
    champDate.value = dateDuJour();
    effacerPad();

    blocSignee.hidden = true;
    formulaire.hidden = false;
    preparerPad();

    statutSignature.classList.remove("signee");
    statutSignature.querySelector("i").className = "fa-solid fa-pen-nib";
    statutSignature.querySelector("span").textContent = "Charte non signée";
}

function notifier(message) {
    notification.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';
    notification.appendChild(document.createTextNode(message));
    notification.classList.add("visible");

    clearTimeout(minuteurNotification);
    minuteurNotification = setTimeout(function () {
        notification.classList.remove("visible");
    }, 5000);
}

function notifierSysteme(message) {
    if (!("Notification" in window)) {
        return;
    }

    function envoyer() {
        new Notification("Charte numérique signée", {
            body: message,
            icon: "../source/logo.png"
        });
    }

    if (Notification.permission === "granted") {
        envoyer();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                envoyer();
            }
        });
    }
}

function signer(evenement) {
    evenement.preventDefault();

    if (!verifierFormulaire()) {
        return;
    }

    const signature = {
        nom: champNom.value.trim(),
        prenom: champPrenom.value.trim(),
        date: champDate.value,
        image: imageSignature()
    };

    enregistrerSignature(signature);
    afficherSignee(signature);

    const message = "La charte numérique a bien été signée par " + signature.prenom + " " + signature.nom + " le " + signature.date + ".";
    notifier(message);
    notifierSysteme(message);
}

function annulerSignature() {
    supprimerSignature();
    afficherFormulaire();
    notifier("La signature a été annulée.");
}

/* ---------- Démarrage ---------- */

pad.addEventListener("pointerdown", commencerTrait);
pad.addEventListener("pointermove", continuerTrait);
pad.addEventListener("pointerup", terminerTrait);
pad.addEventListener("pointercancel", terminerTrait);
boutonEffacer.addEventListener("click", effacerPad);
formulaire.addEventListener("submit", signer);
boutonAnnuler.addEventListener("click", annulerSignature);

[champNom, champPrenom].forEach(function (champ) {
    champ.addEventListener("input", function () {
        champ.removeAttribute("aria-invalid");
    });
});

let largeurPrecedente = window.innerWidth;
window.addEventListener("resize", function () {
    if (window.innerWidth === largeurPrecedente) {
        return;
    }
    largeurPrecedente = window.innerWidth;
    adapterSommaire();
    if (!formulaire.hidden) {
        preparerPad();
    }
});

adapterSommaire();
suivreLecture();

const signatureExistante = lireSignature();
if (signatureExistante) {
    champDate.value = dateDuJour();
    afficherSignee(signatureExistante);
} else {
    afficherFormulaire();
}
