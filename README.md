<a name="retour-en-haut"></a>
<h1 align="center">
  PulsePulse - API
  <br>
</h1>

<h4 align="center">Application de planification de programme fitness PulsePulse
    <br><br>
</h4>

<p align="center">
  <a href="#à-propos-du-projet">À propos du projet</a> •
  <a href="#installation">Installation</a> •
  <a href="#utilisation">Utilisation</a> •
  <a href="#bugs">Bugs</a> •
  <a href="#contact">Contact</a>
</p>


## À propos du projet
Dans le cadre du projet du cours DevMobil de la HEIG-VD en Ingénierie des Médias. Notre équipe réalise une application mobile de fitness PulsePulse. 

L'objectif, pouvoir utiliser l'API du cours ArchiOWeb et pouvoir rendre les gens actifs.
<br><br>
### Développé avec

[![Angular][Angular.com]][Angular-url] [![Ionic][Ionic.com]][Ionic-url]
<br><br>
## Installation
Pour cloner cette application en local, vous aurez besoin de [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download/) (qui vient avec [npm](http://npmjs.com)) et de [Ionic](https://ionicframework.com/) installés sur votre ordinateur. 

Ensuite, exécutez ces lignes de commandes.

```bash
# Cloner le repo
$ git clone https://github.com/KevinPasteur/PulsePulse

# Aller dans le répertoire
$ cd pulsepulse

# Installation des dépendances
$ npm i

# Création du fichier environment.ts
Dans le dossier src/environments
Renommer environment.sample.ts en environment.ts

# Remplacer la variable apiUrl par celle-ci
apiUrl: 'https://pulsepulse-api.onrender.com/api/v1'

# Lancer le projet
$ ionic serve

```

<p align="right">(<a href="#retour-en-haut">retour en haut</a>)</p>

## Utilisation

Afin d'avoir un aperçu de notre application vous retrouverez ci-dessous différents chapitres expliquant chaque fonctionnalité.

### Login / Register
Afin de prendre part à la vie de l'application, retrouvez les pages Connexion et Inscription

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/register.gif" alt="animated" />
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/login.gif" alt="animated" />
</p>

### Profile
Via le profil, vous pourrez retrouver vos différentes informations entrées lors de l'inscription.
(La modification arrive prochainement)

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/profile.gif" alt="animated" />
</p>

### Library
Dans la bibliothèque, vous retrouverez 2 onglets principaux, "Mes Workouts" et "Mes Exercices".

#### Recherche
Afin de retrouver plus facilement votre workout ou votre exercice une barre de recherche est disponible.
<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/search.gif" alt="animated" />
</p>

#### Suppression
Pour supprimer un exercice ou un workout, utilisez les 3 petits points.
<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/delete.gif" alt="animated" />
</p>

#### Créer un workout ou un exercice
Vous avez décidé de créer un workout ou un exercice, depuis la page "Library" vous en aurez la possibilité.

Lors de la création d'un exercice, vous aurez la possibilité de faire un enregistrement audio afin d'ajouter des détails à votre exercice mais aussi d'ajouter une vidéo permettant aux sportifs de voir le mouvement correct.

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/create-workout.gif" alt="animated" />
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/create-exercise.gif" alt="animated" />
</p>

#### Modifier un workout ou un exercice
Vous vous êtes trompé lors de la création d'un workout ou d'un exercice ? Ce n'est pas grave, grâce au bouton de modification vous aurez la possibilité de réparer votre erreur.
<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/update-workout.gif" alt="animated" />
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/update-exercise.gif" alt="animated" />
</p>

#### Voir les détails d'un exercice
Vous voulez voir les détails d'un exercice ? Il vous suffira de vous rendre dans la partie "Mes Exercices" ou bien directement dans votre Workout si vous avez inclus l'exercice dans votre routine.

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/detail-exercise.gif" alt="animated" />
</p>

#### Ajouter un exercice à un workout
Depuis la page de détail d'un workout, vous aurez la possibilité au moyen d'un bouton d'ajouter un exercice (que vous aurez au préalable créé) dans votre workout

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/add-exercise-to-workout.gif" alt="animated" />
</p>

## Audio Player
Si vous avez enregistrer une note vocale pour un exercice, vous aurez la possibilité de l'écouter depuis la page "Mes Exercices", si vous changer de page, le lecteur vous suivra afin de ne pas couper durant votre écoute.

<p align="center">
  <img src="https://github.com/KevinPasteur/PulsePulse/blob/main/src/assets/gifs/audio-player.gif" alt="animated" />
</p>

<p align="right">(<a href="#retour-en-haut">retour en haut</a>)</p>

## Bugs
- La suppression d'un exercice depuis un workout n'est pas possible actuellement

<p align="right">(<a href="#retour-en-haut">retour en haut</a>)</p>

## Contact
La team makema - HEIG-VD - Ingénierie des Médias

<p align="right">(<a href="#retour-en-haut">retour en haut</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Ionic-url]: https://ionicframework.com/
[Ionic.com]: https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white
[Angular-url]:https://angular.io/
[Angular.com]:https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white



