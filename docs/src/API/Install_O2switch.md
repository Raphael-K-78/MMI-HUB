# Installer Un projet Symfony  sur O2switch
Ce document permet de créer et d'installer un projet symfony sur le service O2switch

## Prérequis
- Un compte O2switch
- un client SSH

## Etape
### 1. Utiliser php8.2
sur le serveur [O2switch](https://servd162214.srv.odns.fr:2083) dans la catégorie software aller sur la page **Select PHP Version** et sélectionner la version 8.2 et apply

### 2. Se connecter en ssh
sur le client ssh se connecter avec la commande
```sh
ssh prenomnom@prenom.nom.mmi-velizy.fr
```
Entrer votre mot de passe

### 3. Créer un sous domaine
Dans le menu O2switch dans la section domains aller sur la page domains et crée un nouveau domaine qui aura comme route
```
symfony.prenom.nom.mmi-velizy.fr/public
```

### 4. Créer l'app symfony
sur le ssh crée l'app symfony avec la commande
```
composer create-project symfony/skeleton symfony.prenom.nom.mmi-velizy.fr
```
### 5. vérifie
Aller sur votre [app symfony](http://symfony.prenom.nom.mmi-velizy.fr)
