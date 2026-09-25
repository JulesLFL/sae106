const CENTRE_MAUBEUGE = [50.2785, 3.9743];

const CATEGORIES = {
    patrimoine: "Patrimoine",
    culture: "Culture",
    nature: "Nature et loisirs",
    vie: "Vie locale"
};

const LIEUX = [
    {
        id: "porte-mons",
        nom: "Porte de Mons",
        categorie: "patrimoine",
        icone: "fa-archway",
        position: [50.28029, 3.97402],
        texte: "Porte monumentale des fortifications de Vauban. Elle abrite l'office de tourisme et le musée du Corps de Garde."
    },
    {
        id: "remparts",
        nom: "Remparts de Vauban",
        categorie: "patrimoine",
        icone: "fa-chess-rook",
        position: [50.2791, 3.9796],
        texte: "Bastions, fossés et lunettes : l'enceinte bastionnée du XVIIe siècle se parcourt encore à pied."
    },
    {
        id: "pisselotte",
        nom: "Porte d'eau de la Pisselotte",
        categorie: "patrimoine",
        icone: "fa-water",
        position: [50.27979, 3.97757],
        texte: "Ouvrage hydraulique des fortifications, qui permettait de régler le niveau de l'eau dans les fossés."
    },
    {
        id: "eglise",
        nom: "Église Saint-Pierre-Saint-Paul",
        categorie: "patrimoine",
        icone: "fa-church",
        position: [50.27915, 3.9728],
        texte: "Reconstruite par André Lurçat après la guerre, elle abrite le trésor de sainte Aldegonde."
    },
    {
        id: "chanoinesses",
        nom: "Chapitre des Chanoinesses",
        categorie: "patrimoine",
        icone: "fa-landmark",
        position: [50.27717, 3.97565],
        texte: "Ancien chapitre des chanoinesses, héritières de l'abbaye fondée par sainte Aldegonde au VIIe siècle."
    },
    {
        id: "beguinage",
        nom: "Béguinage des Cantuaines",
        categorie: "patrimoine",
        icone: "fa-house-chimney",
        position: [50.27688, 3.97789],
        texte: "Petites maisons qui accueillaient des béguines, femmes pieuses vivant en communauté sans prononcer de vœux."
    },
    {
        id: "wattignies",
        nom: "Monument de Wattignies",
        categorie: "patrimoine",
        icone: "fa-monument",
        position: [50.28004, 3.97459],
        texte: "Il rappelle la victoire d'octobre 1793 qui a libéré Maubeuge assiégée par les Autrichiens."
    },
    {
        id: "manege",
        nom: "Le Manège",
        categorie: "culture",
        icone: "fa-masks-theater",
        position: [50.27733, 3.97818],
        texte: "Scène nationale : théâtre, danse, cirque, musique et, chaque printemps, le festival VIA."
    },
    {
        id: "soeurs-noires",
        nom: "Chapelle des Sœurs Noires",
        categorie: "culture",
        icone: "fa-palette",
        position: [50.27783, 3.97546],
        texte: "Ancienne chapelle de couvent épargnée par la guerre, devenue un lieu d'expositions."
    },
    {
        id: "boez",
        nom: "Musée Henri Boez",
        categorie: "culture",
        icone: "fa-building-columns",
        position: [50.27785, 3.97159],
        texte: "Le musée municipal de Maubeuge, en plein centre-ville."
    },
    {
        id: "mabuse",
        nom: "Statue de Jean Mabuse",
        categorie: "culture",
        icone: "fa-paintbrush",
        position: [50.27671, 3.97353],
        texte: "Hommage au peintre Jan Gossaert, dit Mabuse, né à Maubeuge vers 1478 et maître de la Renaissance flamande."
    },
    {
        id: "sculfort",
        nom: "Espace Sculfort",
        categorie: "culture",
        icone: "fa-industry",
        position: [50.28093, 3.95973],
        texte: "Ancienne usine reconvertie en lieu culturel : concerts, spectacles et expositions."
    },
    {
        id: "zoo",
        nom: "Parc zoologique",
        categorie: "nature",
        icone: "fa-paw",
        position: [50.27852, 3.96802],
        texte: "Installé au pied des remparts : éléphants, girafes, tigres, hippopotames et bien d'autres."
    },
    {
        id: "sambre",
        nom: "Bords de Sambre",
        categorie: "nature",
        icone: "fa-person-biking",
        position: [50.2765, 3.9723],
        texte: "La rivière traverse la ville ; ses quais et le chemin de halage se prêtent à la balade et au vélo."
    },
    {
        id: "iut",
        nom: "IUT de Maubeuge (UPHF)",
        categorie: "vie",
        icone: "fa-graduation-cap",
        position: [50.27665, 3.98471],
        texte: "Le campus de Maubeuge de l'Université Polytechnique Hauts-de-France, au bord de la Sambre. C'est ici qu'est né ce site !"
    },
    {
        id: "mca",
        nom: "Usine MCA (Renault)",
        categorie: "vie",
        icone: "fa-car",
        position: [50.27472, 3.91483],
        texte: "Maubeuge Construction Automobile, l'usine du groupe Renault où est fabriqué le Kangoo."
    },
    {
        id: "gare",
        nom: "Gare de Maubeuge",
        categorie: "vie",
        icone: "fa-train",
        position: [50.27286, 3.96653],
        texte: "Point de départ des trains vers Aulnoye-Aymeries, Lille et Paris."
    }
];

const ANECDOTES = [
    "La chanson « Le Clair de lune à Maubeuge », écrite par Pierre Perrin en 1962 et reprise notamment par Bourvil, a rendu le nom de la ville célèbre dans toute la France.",
    "Le peintre de la Renaissance Jan Gossaert est surnommé « Mabuse » : c'est une déformation du nom de sa ville natale, Maubeuge.",
    "Le nom de l'entreprise Vallourec vient de trois villes : VALenciennes, LOUvroil et RECquignies. Les deux dernières sont voisines de Maubeuge.",
    "Le zoo de Maubeuge est installé dans les anciennes fortifications de Vauban : les animaux vivent au pied des remparts du XVIIe siècle.",
    "Le maroilles serait né il y a plus de mille ans dans l'abbaye du village de Maroilles, à une vingtaine de kilomètres de Maubeuge.",
    "Après 1940, l'architecte André Lurçat a redessiné presque tout le centre-ville, détruit à environ 90 % pendant la guerre."
];

/* ---------- Compteurs animés ---------- */

function formaterNombre(nombre, separateur) {
    return separateur ? nombre.toLocaleString("fr-FR") : String(nombre);
}

function animerCompteur(compteur) {
    const cible = Number(compteur.dataset.cible);
    const separateur = compteur.dataset.separateur === "true";
    const duree = 1600;
    const debut = performance.now();

    function etape(maintenant) {
        const avancement = Math.min((maintenant - debut) / duree, 1);
        const adouci = 1 - Math.pow(1 - avancement, 3);
        compteur.textContent = formaterNombre(Math.round(cible * adouci), separateur);
        if (avancement < 1) {
            requestAnimationFrame(etape);
        }
    }

    requestAnimationFrame(etape);
}

function initialiserCompteurs() {
    const compteurs = document.querySelectorAll(".compteur");
    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (mouvementReduit || !("IntersectionObserver" in window)) {
        return;
    }

    const observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
            if (entree.isIntersecting) {
                animerCompteur(entree.target);
                observateur.unobserve(entree.target);
            }
        });
    }, { threshold: 0.6 });

    compteurs.forEach(function (compteur) {
        compteur.textContent = "0";
        observateur.observe(compteur);
    });
}

/* ---------- Frise historique ---------- */

function initialiserFrise() {
    const boutons = Array.from(document.querySelectorAll(".frise-date"));
    const panneaux = Array.from(document.querySelectorAll(".epoque"));
    const piste = document.querySelector(".frise-progression");
    const remplissage = document.querySelector("#frise-remplissage");
    const precedent = document.querySelector("#frise-precedent");
    const suivant = document.querySelector("#frise-suivant");
    let indexActif = 0;

    function centre(bouton) {
        return bouton.offsetLeft + bouton.offsetWidth / 2;
    }

    function placerProgression() {
        const debut = centre(boutons[0]);
        const fin = centre(boutons[boutons.length - 1]);
        piste.style.left = debut + "px";
        piste.style.right = "auto";
        piste.style.width = fin - debut + "px";
        remplissage.style.width = ((centre(boutons[indexActif]) - debut) / (fin - debut)) * 100 + "%";
    }

    function afficher(index, donnerFocus) {
        indexActif = index;

        boutons.forEach(function (bouton, i) {
            const actif = i === index;
            bouton.setAttribute("aria-selected", String(actif));
            bouton.tabIndex = actif ? 0 : -1;
            bouton.classList.toggle("passee", i < index);
        });

        panneaux.forEach(function (panneau, i) {
            panneau.hidden = i !== index;
            panneau.classList.toggle("active", i === index);
        });

        precedent.disabled = index === 0;
        suivant.disabled = index === boutons.length - 1;
        placerProgression();

        boutons[index].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        if (donnerFocus) {
            boutons[index].focus();
        }
    }

    boutons.forEach(function (bouton, i) {
        bouton.addEventListener("click", function () {
            afficher(i, false);
        });

        bouton.addEventListener("keydown", function (evenement) {
            let cible = null;
            if (evenement.key === "ArrowRight") cible = Math.min(i + 1, boutons.length - 1);
            if (evenement.key === "ArrowLeft") cible = Math.max(i - 1, 0);
            if (evenement.key === "Home") cible = 0;
            if (evenement.key === "End") cible = boutons.length - 1;
            if (cible !== null) {
                evenement.preventDefault();
                afficher(cible, true);
            }
        });
    });

    precedent.addEventListener("click", function () {
        afficher(Math.max(indexActif - 1, 0), false);
    });

    suivant.addEventListener("click", function () {
        afficher(Math.min(indexActif + 1, boutons.length - 1), false);
    });

    window.addEventListener("resize", placerProgression);

    // Premier affichage sans défilement de la frise
    boutons.forEach(function (bouton, i) {
        bouton.setAttribute("aria-selected", String(i === 0));
        bouton.tabIndex = i === 0 ? 0 : -1;
    });
    panneaux.forEach(function (panneau, i) {
        panneau.hidden = i !== 0;
    });
    precedent.disabled = true;
    placerProgression();
}

/* ---------- Carte interactive ---------- */

function initialiserCarte() {
    const liste = document.querySelector("#liste-lieux");
    const compteurLieux = document.querySelector("#lieux-compteur");
    const filtres = document.querySelectorAll(".filtre");
    const boutonRecentrer = document.querySelector("#carte-recentrer");
    const erreurCarte = document.querySelector("#carte-erreur");
    const conteneurCarte = document.querySelector("#carte-ville");
    const boutonsListe = {};
    const reperes = {};
    let carte = null;
    let filtreActif = "tous";
    let lieuActif = null;

    function lieuxVisibles() {
        return LIEUX.filter(function (lieu) {
            return filtreActif === "tous" || lieu.categorie === filtreActif;
        });
    }

    function contenuPopup(lieu) {
        return '<span class="popup-categorie">' + CATEGORIES[lieu.categorie] + "</span>" +
            '<span class="popup-titre">' + lieu.nom + "</span>" +
            "<p>" + lieu.texte + "</p>";
    }

    // Liste des lieux (fonctionne même si la carte ne se charge pas)
    LIEUX.forEach(function (lieu) {
        const element = document.createElement("li");
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "lieu lieu-" + lieu.categorie;
        bouton.innerHTML =
            '<span class="lieu-icone"><i class="fa-solid ' + lieu.icone + '" aria-hidden="true"></i></span>' +
            '<span><span class="lieu-nom">' + lieu.nom + '</span>' +
            '<span class="lieu-categorie">' + CATEGORIES[lieu.categorie] + "</span></span>";
        bouton.title = lieu.texte;
        bouton.addEventListener("click", function () {
            selectionnerLieu(lieu.id, true);
        });
        element.appendChild(bouton);
        liste.appendChild(element);
        boutonsListe[lieu.id] = element;
    });

    function selectionnerLieu(id, deplacer) {
        const lieu = LIEUX.find(function (element) {
            return element.id === id;
        });

        if (lieuActif && reperes[lieuActif]) {
            reperes[lieuActif].getElement()?.classList.remove("actif");
        }
        Object.keys(boutonsListe).forEach(function (cle) {
            boutonsListe[cle].firstChild.removeAttribute("aria-current");
        });

        lieuActif = id;
        boutonsListe[id].firstChild.setAttribute("aria-current", "true");
        boutonsListe[id].scrollIntoView({ block: "nearest", behavior: "smooth" });

        if (!carte) {
            return;
        }

        const repere = reperes[id];
        if (deplacer) {
            carte.flyTo(lieu.position, Math.max(carte.getZoom(), 16), { duration: 0.8 });
        }
        repere.openPopup();
        repere.getElement()?.classList.add("actif");
    }

    function toutAfficher() {
        if (!carte) {
            return;
        }
        const positions = lieuxVisibles().map(function (lieu) {
            return lieu.position;
        });
        carte.flyToBounds(positions, { padding: [40, 40], maxZoom: 16, duration: 0.8 });
    }

    function appliquerFiltre(filtre, recadrer) {
        filtreActif = filtre;

        filtres.forEach(function (bouton) {
            bouton.setAttribute("aria-pressed", String(bouton.dataset.filtre === filtre));
        });

        const visibles = lieuxVisibles();
        LIEUX.forEach(function (lieu) {
            const visible = visibles.includes(lieu);
            boutonsListe[lieu.id].hidden = !visible;
            if (carte) {
                if (visible) {
                    reperes[lieu.id].addTo(carte);
                } else {
                    reperes[lieu.id].remove();
                }
            }
        });

        compteurLieux.textContent = visibles.length + " lieu" + (visibles.length > 1 ? "x" : "") + " à découvrir";
        if (carte) {
            carte.closePopup();
        }
        if (recadrer !== false) {
            toutAfficher();
        }
    }

    filtres.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            appliquerFiltre(bouton.dataset.filtre);
        });
    });

    // Boutons « Voir sur la carte » des cartes Patrimoine
    document.querySelectorAll(".voir-carte").forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            appliquerFiltre("tous");
            document.querySelector("#carte").scrollIntoView({ behavior: "smooth" });
            setTimeout(function () {
                selectionnerLieu(bouton.dataset.lieu, true);
            }, 600);
        });
    });

    if (typeof L === "undefined") {
        erreurCarte.hidden = false;
        boutonRecentrer.hidden = true;
        appliquerFiltre("tous", false);
        return;
    }

    carte = L.map(conteneurCarte, {
        center: CENTRE_MAUBEUGE,
        zoom: 15,
        scrollWheelZoom: false
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        referrerPolicy: "strict-origin-when-cross-origin",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carte);

    // La molette ne zoome qu'après un clic sur la carte, pour ne pas bloquer le défilement de la page
    carte.on("click", function () {
        carte.scrollWheelZoom.enable();
    });
    carte.on("mouseout", function () {
        carte.scrollWheelZoom.disable();
    });

    LIEUX.forEach(function (lieu) {
        const icone = L.divIcon({
            className: "repere lieu-" + lieu.categorie,
            html: '<span><i class="fa-solid ' + lieu.icone + '" aria-hidden="true"></i></span>',
            iconSize: [34, 34],
            iconAnchor: [17, 34],
            popupAnchor: [0, -34]
        });

        const repere = L.marker(lieu.position, { icon: icone, title: lieu.nom, alt: lieu.nom })
            .bindPopup(contenuPopup(lieu), { className: "lieu-" + lieu.categorie, maxWidth: 260 });

        repere.on("click", function () {
            selectionnerLieu(lieu.id, false);
        });

        reperes[lieu.id] = repere;
    });

    carte.on("popupclose", function () {
        if (lieuActif && reperes[lieuActif]) {
            reperes[lieuActif].getElement()?.classList.remove("actif");
        }
    });

    boutonRecentrer.addEventListener("click", function () {
        carte.closePopup();
        toutAfficher();
    });

    // Premier cadrage sur le centre-ville (l'usine MCA, plus éloignée, reste accessible par la liste)
    carte.fitBounds(LIEUX.filter(function (lieu) {
        return lieu.id !== "mca";
    }).map(function (lieu) {
        return lieu.position;
    }), { padding: [30, 30] });
    appliquerFiltre("tous", false);
}

/* ---------- Gastronomie ---------- */

function initialiserPlats() {
    document.querySelectorAll(".plat-carte").forEach(function (carte) {
        carte.addEventListener("click", function () {
            const retournee = carte.getAttribute("aria-pressed") === "true";
            carte.setAttribute("aria-pressed", String(!retournee));
        });
    });
}

/* ---------- Le saviez-vous ---------- */

function initialiserAnecdotes() {
    const texte = document.querySelector("#anecdote-texte");
    const bouton = document.querySelector("#anecdote-suivante");
    let index = 0;

    bouton.hidden = false;
    bouton.addEventListener("click", function () {
        index = (index + 1) % ANECDOTES.length;
        texte.textContent = ANECDOTES[index];
        texte.classList.remove("change");
        void texte.offsetWidth;
        texte.classList.add("change");
    });
}

initialiserCompteurs();
initialiserFrise();
initialiserCarte();
initialiserPlats();
initialiserAnecdotes();
