# SAE 106 - Les organisations du Val de Sambre

Site web statique de présentation réalisé dans le cadre de la **SAE 106** à l'**IUT de Maubeuge (UPHF)**.

Le site présente deux organisations industrielles implantées à Maubeuge et dans le Val de Sambre (**Vallourec** et **MCA**), compare leur empreinte écologique, propose une charte numérique d'entreprise signable en ligne et présente la démarche de l'équipe.

Il est servi par un conteneur **nginx** (image `nginx:alpine`) et exposé sur le port **30080**.

---

## Sommaire

1. [Aperçu des pages](#aperçu-des-pages)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies utilisées](#technologies-utilisées)
4. [Structure du projet](#structure-du-projet)
5. [Organisation du CSS](#organisation-du-css)
6. [Les scripts JavaScript](#les-scripts-javascript)
7. [Charte graphique](#charte-graphique)
8. [Installation en local](#installation-en-local)
9. [Hébergement sur TrueNAS SCALE avec Portainer](#hébergement-sur-truenas-scale-avec-portainer)
10. [Modifier et compléter le site](#modifier-et-compléter-le-site)
11. [Conventions du projet](#conventions-du-projet)
12. [Contenus restant à compléter](#contenus-restant-à-compléter)
13. [Équipe](#équipe)
14. [Licence](#licence)

---

## Aperçu des pages

| Page | Fichier | Contenu |
|---|---|---|
| **Accueil / Organisations** | `index.html` | Bannière de présentation avec fanion « SAE 106 », chiffres clés, fiches détaillées de Vallourec et de MCA (photo, logo, coordonnées, missions, impact local), sources et accès aux autres onglets. |
| **Notre approche** | `page/onglet1.html` | Informations sur la séance de brainstorming, carte des idées (objectifs, idées, moyens, contraintes), idées retenues et frise des étapes du projet. |
| **Écologie** | `page/onglet2.html` | Tableau comparatif des actions environnementales des deux organisations sur 6 critères, carte mentale reliée d'autres pistes possibles et sources documentaires. |
| **Charte numérique** | `page/onglet3.html` | Charte d'utilisation des outils numériques en 10 articles, sommaire interactif et formulaire de signature en ligne. |
| **Maubeuge** | `page/onglet4.html` | Présentation de la ville de Maubeuge (page en attente de contenu). |
| **Erreur 404** | `404.html` | Page d'erreur personnalisée sur le thème de l'espace (astronaute, terminal animé). |

Toutes les pages partagent le même en-tête (logo, menu, menu burger sur mobile), le même fil d'Ariane et le même pied de page.

### Les 10 articles de la charte numérique

1. L'utilisation du matériel personnel
2. Les moyens de surveillance des salariés
3. L'utilisation de la messagerie électronique
4. L'accès internet pour raisons personnelles
5. Les sanctions
6. Règles pour créer et gérer les mots de passe
7. L'utilisation du VPN en cas de télétravail
8. Une politique de gestion de crise
9. La maintenance des systèmes informatiques
10. La signature du salarié

---

## Fonctionnalités

### Navigation (toutes les pages)

- **En-tête fixe** qui prend une ombre dès que l'on fait défiler la page.
- **Page active** mise en évidence automatiquement dans le menu.
- **Menu burger** sur mobile (768 px et moins) : il se ferme avec la touche `Échap`, en cliquant sur un lien ou en repassant sur grand écran.
- **Fil d'Ariane** : « Accueil » sur la page d'accueil, « Accueil › Nom de l'onglet » sur les autres pages.
- **Animations d'apparition** au défilement (les éléments ayant la classe `apparition`).
- **Année du pied de page** mise à jour automatiquement.

### Accueil

- Bannière avec titre, accroche, deux boutons d'action et fanion animé.
- Rangée de chiffres clés.
- Fiches des organisations avec emplacement photo. Si une photo ou un logo est absent, une icône et un fond dégradé s'affichent à la place (grâce à `onerror="this.remove()"`).

### Écologie

- Tableau comparatif aux couleurs de chaque organisation, avec lignes alternées et mise en évidence au survol. Sur petit écran, le tableau défile horizontalement.
- Carte mentale dont les branches sont reliées au cercle central par des traits (masqués sur mobile).

### Notre approche

- Carte des idées en quatre branches de couleur autour de la question de départ.
- Frise des étapes du projet : horizontale sur ordinateur, verticale sur mobile.

### Charte numérique

- **Sommaire interactif** :
  - affiché en colonne fixe à gauche sur ordinateur, repliable en haut de l'écran sur mobile ;
  - la partie en cours de lecture est surlignée ;
  - compteur « x / 10 lus », barre de progression et coche sur chaque article lu ;
  - statut « Charte non signée / Charte signée » qui mène directement à la signature.
- **Signature en ligne** :
  - saisie du nom et du prénom, date remplie automatiquement ;
  - zone de signature à dessiner à la souris, au doigt ou au stylet, avec un bouton « Effacer » ;
  - case d'engagement obligatoire et message d'erreur précis si un élément manque ;
  - après signature : récapitulatif avec l'image de la signature, bouton « Télécharger la signature » (PNG) et bouton « Annuler la signature ».
- **Notification de confirmation** :
  - message affiché en bas à droite de la page ;
  - notification système du navigateur si l'utilisateur l'autorise.

> **Limites de la signature** : le site est entièrement statique, sans serveur ni base de données. La signature est enregistrée uniquement dans le navigateur de la personne qui signe (`localStorage`, clé `sae106-charte-signature`). Elle n'est envoyée à personne. La notification système du navigateur ne fonctionne qu'en **HTTPS** ou sur **`localhost`** : en `http://<IP>:30080`, seul le message affiché dans la page apparaît.

### Page 404

- Fond étoilé généré aléatoirement, étoile filante et sol en perspective animé.
- Titre « 404 » avec effet glitch.
- Terminal qui tape l'adresse introuvable caractère par caractère.
- Astronaute cliquable qui tourne sur lui-même et réagit avec des messages différents.
- Bouton « Page précédente ».
- Elle n'est affichée que lorsque le site est servi par nginx (Docker).

### Accessibilité

- Navigation au clavier avec contour de focus visible.
- Attributs ARIA : `aria-current`, `aria-expanded`, `aria-label`, `aria-live` pour les notifications et les erreurs.
- Icônes décoratives masquées aux lecteurs d'écran (`aria-hidden="true"`).
- Animations réduites au minimum si l'utilisateur a activé l'option « réduire les animations » de son système (`prefers-reduced-motion`).
- Mise en page adaptée à toutes les largeurs d'écran (points de rupture : 900, 768, 600, 560, 480 et 360 px).

---

## Technologies utilisées

| Outil | Rôle |
|---|---|
| HTML5 | Structure des pages |
| CSS3 | Mise en page (Grid, Flexbox), variables, animations, `clip-path`, `color-mix()` |
| JavaScript (sans framework) | Menu, animations, sommaire, signature, page 404 |
| [Font Awesome 6.5.1](https://fontawesome.com/) | Icônes (chargées depuis le CDN cdnjs) |
| [Google Fonts](https://fonts.google.com/) | Polices Libre Baskerville et Source Sans 3 (et Bungee, Space Grotesk, Space Mono pour la 404) |
| nginx (`nginx:alpine`) | Serveur web dans le conteneur |
| Docker / Docker Compose | Construction de l'image et lancement du site |
| TrueNAS SCALE + Portainer | Hébergement et déploiement automatique depuis GitHub |

Aucune installation de dépendances n'est nécessaire (pas de `npm`, pas de build) : les fichiers sont servis tels quels.

---

## Structure du projet

```
sae106/
├── index.html                  Accueil : bannière, chiffres clés, fiches des organisations
├── 404.html                    Page d'erreur personnalisée
├── page/
│   ├── onglet1.html            Notre approche (brainstorming, frise des étapes)
│   ├── onglet2.html            Écologie (tableau comparatif, carte mentale)
│   ├── onglet3.html            Charte numérique (sommaire, articles, signature)
│   └── onglet4.html            Maubeuge
├── css/
│   ├── style.css               Base commune : variables, polices, titres, boutons, imports
│   ├── components/             Éléments réutilisés sur plusieurs pages
│   │   ├── animations.css      Animations et apparition au défilement
│   │   ├── header.css          En-tête, menu et menu burger
│   │   ├── footer.css          Pied de page en trois colonnes
│   │   ├── cartes.css          Cartes « Les autres onglets »
│   │   ├── fil-ariane.css      Fil d'Ariane
│   │   ├── entreprises.css     Fiches des organisations
│   │   └── sources.css         Blocs « Sources »
│   └── pages/                  Styles propres à une page
│       ├── index.css           Accueil (bannière, fanion, chiffres clés)
│       ├── onglet.css          Base commune aux onglets (en-tête de page, blocs)
│       ├── brainstorming.css   Notre approche (carte des idées, frise)
│       ├── ecologie.css        Écologie (tableau, carte mentale)
│       ├── charte.css          Charte numérique (sommaire, articles, signature)
│       └── 404.css             Page 404
├── js/
│   ├── main.js                 Menu burger, page active, en-tête, apparitions, année
│   ├── charte.js               Sommaire interactif et signature de la charte
│   └── 404.js                  Étoiles, terminal animé et astronaute de la page 404
├── source/                     Images
│   ├── logo.png                Logo de l'IUT (en-tête, pied de page, favicon)
│   ├── logo_Vallourec.png      Logo de Vallourec
│   ├── photo_vallourec.jpg     Photo de la fiche Vallourec
│   ├── photo_mca.jpg           Photo de la fiche MCA
│   └── saev2.png               Ancienne bannière (plus utilisée)
├── nginx/default.conf          Configuration nginx (page 404, cache)
├── Dockerfile                  Image nginx contenant le site
├── docker-compose.yml          Service « site » exposé sur le port 30080
├── .dockerignore               Fichiers exclus de l'image
├── LICENSE                     Licence MIT
└── README.md                   Ce fichier
```

### Quels fichiers chaque page charge

| Page | CSS | JavaScript |
|---|---|---|
| `index.html` | `style.css`, `pages/index.css` | `main.js` |
| `onglet1.html` | `style.css`, `pages/onglet.css`, `pages/brainstorming.css` | `main.js` |
| `onglet2.html` | `style.css`, `pages/ecologie.css` | `main.js` |
| `onglet3.html` | `style.css`, `pages/onglet.css`, `pages/charte.css` | `main.js`, `charte.js` |
| `onglet4.html` | `style.css`, `pages/onglet.css` | `main.js` |
| `404.html` | `style.css`, `pages/404.css` | `404.js` |

`style.css` importe lui-même tous les fichiers de `css/components/`.

---

## Organisation du CSS

- **`css/style.css`** est la feuille de base commune à toutes les pages. Elle doit **garder ce nom**. Elle contient les variables de couleurs et de polices, les styles globaux (titres, boutons, focus) et importe les composants.
- **`css/components/`** contient les éléments présents sur plusieurs pages.
- **`css/pages/`** contient les styles propres à une seule page. Un style qui ne sert qu'à une page ne doit pas être ajouté dans `style.css`.
- Les fichiers sont chargés dans cet ordre : `style.css`, puis le ou les fichiers de la page.

### Numéro de version des fichiers (`?v=`)

Chaque lien vers un fichier CSS ou JS se termine par un numéro de version, par exemple `style.css?v=5`. Il oblige les navigateurs à recharger le fichier au lieu d'utiliser une ancienne copie en cache.

**Après une modification importante du CSS ou du JS, augmenter ce numéro** dans les pages concernées (et dans les `@import` de `style.css` pour les composants). Pour tout passer de `v=5` à `v=6` d'un coup :

```bash
grep -rl "?v=5" --exclude-dir=.git . | xargs sed -i 's/?v=5/?v=6/g'
```

---

## Les scripts JavaScript

### `js/main.js` (toutes les pages sauf la 404)

| Fonction | Rôle |
|---|---|
| `ouvrirMenu`, `fermerMenu`, `basculerMenu` | Gestion du menu burger sur mobile |
| `marquerPageActive` | Ajoute `aria-current="page"` au lien du menu de la page affichée |
| `afficherAnnee` | Met l'année en cours dans le pied de page |
| `surveillerDefilement` | Ajoute l'ombre de l'en-tête au défilement |
| `animerApparitions` | Fait apparaître les éléments `.apparition` quand ils entrent à l'écran |

### `js/charte.js` (Charte numérique)

| Partie | Rôle |
|---|---|
| Sommaire | Ouverture automatique sur ordinateur, fermeture après un clic sur mobile, section active, compteur et barre de lecture |
| Zone de signature | Dessin sur un `<canvas>` avec la souris, le doigt ou un stylet, adapté aux écrans haute définition |
| Formulaire | Vérification des champs, de la signature et de la case d'engagement |
| Enregistrement | Sauvegarde, lecture et suppression de la signature dans le `localStorage` du navigateur |
| Notifications | Message dans la page et notification système du navigateur |

### `js/404.js` (page 404)

Génère les étoiles, écrit le texte du terminal caractère par caractère, gère l'astronaute cliquable et le bouton « Page précédente ».

---

## Charte graphique

### Couleurs

Les couleurs sont définies une seule fois, sous forme de variables dans `css/style.css` (`:root`).

| Variable | Valeur | Utilisation |
|---|---|---|
| `--fond` | `#f7f5f0` | Fond des pages (crème) |
| `--surface` | `#ffffff` | Cartes et blocs |
| `--surface-2` | `#efebe3` | Fonds secondaires, pastilles |
| `--texte` | `#1f2430` | Texte principal |
| `--texte-doux` | `#5a6070` | Texte secondaire |
| `--bordure` | `#e2ddd2` | Bordures |
| `--primaire` | `#1f3a5f` | Bleu marine : titres, boutons, pied de page |
| `--primaire-fonce` | `#152a45` | Survol des boutons, bas du pied de page |
| `--accent` | `#1a93b3` | Bleu clair : liens, soulignements, éléments actifs |
| `--or` | `#b8892b` | Doré : filets décoratifs, fanion, numéros |
| `--or-clair` | `#f3dca6` | Doré clair : textes sur fond bleu |

### Polices

- **Libre Baskerville** (serif) pour les titres (`--police-titre`).
- **Source Sans 3** (sans serif) pour le texte (`--police-texte`).
- La page 404 a son propre style : Bungee, Space Grotesk et Space Mono.

### Éléments récurrents

- Titres de page soulignés d'un filet doré centré.
- Titres de section soulignés d'un filet bleu clair à gauche.
- Cartes blanches à coins arrondis avec ombre légère.
- Pastilles rondes pour les icônes et les numéros.

---

## Installation en local

### Prérequis

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/) avec le plugin Docker Compose

### Lancer le site avec Docker (recommandé)

```bash
git clone https://github.com/JulesLFL/sae106.git
cd sae106
docker compose up -d --build
```

Le site est ensuite accessible sur [http://localhost:30080](http://localhost:30080).

### Mettre à jour après une modification

```bash
docker compose up -d --build
```

### Arrêter le site

```bash
docker compose down
```

### Sans Docker

Le site étant entièrement statique, on peut aussi :

- ouvrir directement `index.html` dans un navigateur ;
- ou lancer un petit serveur local depuis le dossier du projet :

```bash
python3 -m http.server 8000
```

puis ouvrir [http://localhost:8000](http://localhost:8000).

Sans Docker, la page 404 personnalisée ne s'affiche pas : elle dépend de la configuration nginx.

### Fonctionnement du conteneur

- Le `Dockerfile` part de l'image `nginx:alpine`, copie la configuration `nginx/default.conf` puis tous les fichiers du site dans `/usr/share/nginx/html/`.
- `nginx/default.conf` :
  - sert `index.html` par défaut ;
  - renvoie `404.html` pour toute page introuvable ;
  - envoie l'en-tête `Cache-Control: no-cache` pour que les navigateurs vérifient toujours s'il existe une version plus récente.
- `docker-compose.yml` expose le port 80 du conteneur sur le port **30080** de la machine et redémarre le conteneur automatiquement (`restart: unless-stopped`).
- `.dockerignore` exclut de l'image `.git`, `Dockerfile`, `docker-compose.yml`, `README.md` et `LICENSE`.

---

## Hébergement sur TrueNAS SCALE avec Portainer

Le site est hébergé sur un serveur **TrueNAS SCALE** grâce à **Portainer**, relié directement au dépôt GitHub. Chaque déploiement récupère le code du dépôt et construit l'image à partir du `Dockerfile`.

### 1. Installer Portainer sur TrueNAS SCALE

1. Dans l'interface TrueNAS, aller dans **Apps** > **Discover Apps**.
2. Rechercher **Portainer** et cliquer sur **Install**.
3. Garder la configuration par défaut (ou choisir un port web) puis valider.
4. Une fois l'application démarrée, ouvrir l'interface web de Portainer et créer le compte administrateur.

### 2. Créer la stack depuis le dépôt GitHub

1. Dans Portainer, sélectionner l'environnement **local**.
2. Aller dans **Stacks** > **Add stack**.
3. Nommer la stack, par exemple `sae106`.
4. Choisir la méthode de build **Repository** et renseigner :

   | Champ | Valeur |
   |---|---|
   | Repository URL | `https://github.com/JulesLFL/sae106` |
   | Repository reference | `refs/heads/main` |
   | Compose path | `docker-compose.yml` |

5. Si le dépôt est **privé**, activer **Authentication** et renseigner le nom d'utilisateur GitHub ainsi qu'un **Personal Access Token** (droit `repo` en lecture) à la place du mot de passe.
6. Cliquer sur **Deploy the stack**.

Le site est alors accessible sur `http://<IP-du-TrueNAS>:30080`.

### 3. Mise à jour automatique (GitOps)

Pour que le site se mette à jour à chaque `push` sur la branche `main` :

1. Ouvrir la stack `sae106` dans Portainer.
2. Activer **GitOps updates**.
3. Choisir le mode de déclenchement :
   - **Polling** : Portainer vérifie le dépôt à intervalle régulier (par exemple `5m`).
   - **Webhook** : Portainer fournit une URL à ajouter dans GitHub, dans **Settings** > **Webhooks** du dépôt (le TrueNAS doit alors être joignable depuis Internet).
4. Activer **Force redeployment** pour que l'image soit reconstruite même si le fichier `docker-compose.yml` n'a pas changé.
5. Sauvegarder avec **Update the stack**.

Pour forcer une mise à jour manuellement : ouvrir la stack puis cliquer sur **Pull and redeploy**.

### Points d'attention

- Le port **30080** ne doit pas déjà être utilisé par une autre application TrueNAS. Pour le changer, modifier la ligne `"30080:80"` dans `docker-compose.yml`.
- Le conteneur redémarre automatiquement (`restart: unless-stopped`), y compris après un redémarrage du serveur.
- Les fichiers listés dans `.dockerignore` ne sont pas copiés dans l'image.
- Pour que les notifications système de la charte fonctionnent, le site doit être servi en **HTTPS** (par exemple derrière un reverse proxy).

---

## Modifier et compléter le site

### Remplacer une photo ou un logo

Déposer l'image dans `source/` en gardant le même nom :

| Image | Fichier attendu |
|---|---|
| Photo de la fiche Vallourec | `source/photo_vallourec.jpg` |
| Photo de la fiche MCA | `source/photo_mca.jpg` |
| Logo de Vallourec | `source/logo_Vallourec.png` |
| Logo de MCA | `source/logo_MCA.png` (absent pour l'instant : une icône s'affiche à la place) |

Les photos sont recadrées automatiquement (`object-fit: cover`) : une image au format paysage d'au moins 800 px de large donne le meilleur résultat.

### Compléter un article de la charte

Dans `page/onglet3.html`, chaque article est un bloc `<li class="article">` :

```html
<li class="article apparition" id="messagerie" style="--delai: 3">
    <h3><i class="fa-solid fa-envelope" aria-hidden="true"></i> L'utilisation de la messagerie électronique</h3>
    <p>Description de l'article à compléter.</p>
    <ul class="engagements">
        <li>Règle à compléter</li>
    </ul>
</li>
```

Remplacer le texte de la description et des règles. On peut ajouter autant de `<li>` que nécessaire dans la liste `engagements`. La numérotation (01, 02...) est automatique.

### Ajouter un nouvel onglet

1. Copier une page existante de `page/` (par exemple `onglet4.html`) et la renommer.
2. Modifier le `<title>`, la `<meta name="description">`, le fil d'Ariane et le contenu.
3. Ajouter le lien dans le menu `<nav id="menu">` et dans la colonne « Navigation » du pied de page, **sur toutes les pages**.
4. Ajouter une carte dans la section « Les autres onglets » de `index.html`.
5. Si la page a besoin de styles propres, créer un fichier dans `css/pages/` et le charger après `style.css`.

### Faire apparaître un élément au défilement

Ajouter la classe `apparition` à l'élément. Pour décaler les apparitions les unes après les autres, ajouter `style="--delai: 1"`, `--delai: 2`, etc. (chaque unité ajoute 0,1 seconde).

---

## Conventions du projet

- **Noms en français** pour les classes CSS, les fonctions et les variables JavaScript (`ouvrirMenu`, `.carte-lien`, `--primaire`...).
- **Pas de tiret long ni de tiret moyen**, y compris sous la forme `&mdash;` ou `&ndash;` : utiliser uniquement le trait d'union « - ».
- **`css/style.css` garde son nom** et ne contient que ce qui est commun à tout le site.
- Chemins relatifs : `source/...` depuis `index.html`, `../source/...` depuis les pages de `page/`. La page 404 utilise des chemins absolus (`/css/...`) car elle peut s'afficher à n'importe quelle adresse.
- Liens externes ouverts dans un nouvel onglet avec `target="_blank" rel="noopener"`.
- Icônes Font Awesome toujours accompagnées de `aria-hidden="true"`.

---

## Contenus restant à compléter

- [ ] **Notre approche** : date, participants et durée du brainstorming, question de départ, idées de la carte, idées retenues, dates des étapes du projet.
- [ ] **Charte numérique** : version, date, rédacteurs, préambule, description et règles des 9 premiers articles, texte d'engagement de l'article 10.
- [ ] **Maubeuge** : tout le contenu de la page.
- [ ] **Accueil** :
  - vérifier la fiche MCA (a priori Maubeuge Construction Automobile, usine du groupe Renault) ;
  - ajouter l'adresse du site officiel de MCA (les liens mènent pour l'instant à `#`) ;
  - ajouter le logo `source/logo_MCA.png`.
- [ ] **Pied de page** : noms des membres de l'équipe.

---

## Équipe

Projet réalisé par des étudiants de l'IUT de Maubeuge (UPHF) dans le cadre de la SAE 106.

| Membre | Rôle |
|---|---|
| À compléter | À compléter |
| À compléter | À compléter |
| À compléter | À compléter |
| À compléter | À compléter |

---

## Licence

Projet distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE).
