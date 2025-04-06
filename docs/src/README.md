# MMI HUB
## Présentation du Projet
Site web symfony/Angular pour la gestion d'évenement pour tous les IUTs avec BUT MMI
## Features
- Gestion des utilisateur: Créer,supprimer,desactivé; 3 rôles, étudiants,intervenant,admin. 1 utilisateur identifiant, mdp, nom, prénom
- Gestion des evenement: Création modification supression, inscription, 1 titre, une image, une desc (en md), un intervenant
- Back office: gérer utilisateur évenement, voir les stats (chartjs)
- page profil, modification user, evenement auquel on est inscrit ou qu'on a crée
- section commentaire pour les events

## DB
- User: id_user, nom, prenom, mail,status , pwd,ROLE
- Event: id_event, nom, id_univ, id_user, img, content
- Universite: id_univ, nom, ville
- Commentaire: id_comment, id_user, id_event, content
- Inscription: id_inscript, id_user, id_event

//pour l'identifiant on utilise mail au lieu du n° étudiant pour si on change de systeme d'hébergement nous puissions mettre en place un system de mailing

## Technologie

### Back
- symfony
- mysql
- phpmyadmin
- apache2

### Front
- Angular
- MarkedJS
- TailWind

## Installation
### Prérequis
Avant d'installer le dépot Github assurez-vous d'avoir les éléments suivants installés sur votre système:
- npm
- Angular
- Symfony CLI
- Composer
- php 8.2
### Installation
sous debian
```sh
./install.sh
```
sous windows
```bat
install.bat
```

