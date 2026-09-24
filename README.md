# SAE 106

Site web statique réalisé dans le cadre de la SAE 106 (UPHF - IUT de Maubeuge).

Le site est servi par un conteneur **nginx** (image `nginx:alpine`) et exposé sur le port **30080**.

## Structure du projet

```
sae106/
├── index.html            Page d'accueil
├── 404.html              Page d'erreur personnalisée
├── page/                 Pages des onglets (onglet1.html à onglet4.html)
├── css/
│   ├── style.css         Base commune : polices, couleurs, boutons, import des composants
│   ├── components/       Header, footer, cartes, fil d'Ariane, animations
│   └── pages/            Styles propres à une page (accueil, onglets, 404)
├── js/
│   ├── main.js           Menu hamburger, page active, animations au défilement
│   ├── 404.js            Étoiles, terminal animé et astronaute de la page 404
│   └── charte.js         Sommaire de la charte et signature en ligne
├── source/               Images (logo, bannière)
├── nginx/default.conf    Configuration nginx (page 404, cache)
├── Dockerfile            Image nginx contenant le site
├── docker-compose.yml    Service "site" exposé sur le port 30080
└── .dockerignore         Fichiers exclus de l'image
```

## Installation en local

### Prérequis

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/) avec le plugin Docker Compose

### Lancer le site

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

Le site étant entièrement statique, il est aussi possible d'ouvrir directement `index.html` dans un navigateur. La page 404 personnalisée ne fonctionne qu'avec nginx (Docker).

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
   - **Webhook** : Portainer fournit une URL à ajouter dans GitHub, dans **Settings** → **Webhooks** du dépôt (le TrueNAS doit alors être joignable depuis Internet).
4. Activer **Force redeployment** pour que l'image soit reconstruite même si le fichier `docker-compose.yml` n'a pas changé.
5. Sauvegarder avec **Update the stack**.

Pour forcer une mise à jour manuellement : ouvrir la stack puis cliquer sur **Pull and redeploy**.

### Points d'attention

- Le port **30080** ne doit pas déjà être utilisé par une autre application TrueNAS. Pour le changer, modifier la ligne `"30080:80"` dans `docker-compose.yml`.
- Le conteneur redémarre automatiquement (`restart: unless-stopped`), y compris après un redémarrage du serveur.
- Les fichiers listés dans `.dockerignore` ne sont pas copiés dans l'image.

## Licence

Projet distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE).
