# Installation de l'API
## Prérequis
Avant de commencer l'installation, assurez-vous d'avoir les éléments suivants :

- Un serveur fonctionnant sous Linux avec Apache2 installé
- Accès root ou un utilisateur avec des privilèges sudo
- PHP (minimum 8.1) et les extensions nécessaires pour Symfony
- Composer installé sur le serveur
- Un domaine configurée
- Symfony-CLI installé sur le serveur
- un Client Git

## Etapes
### 1. Clonage du Dépot MMI HUB
Dans un Premier temps Cloner le dépot du Projet MMI HUB dans un dossier temporaire

```sh 
mkdir temp
cd temp
git clone https://github.com/Raphael-K-78/MMI-HUB.git /var/www/api-symfony 
``` 
### 2. Installation du Projet
Puis éxécuter le fichier `install.sh`:

```sh
cd MMI-HUB
chown +x install.sh
./install.sh
```

### 3 . Déplacer l'API
Déplacer l'API dans le dossier wwww 
```sh
mv -rf back /var/www/API
```


### 4. Configuration du VirtualHost
Crée le fichier de comfiguration pour l'API
```sh
sudo nano /etc/apache2/sites-available/api-mmi-hub.conf
```
Ajouter le contenue suivant en modifiant le chemin et le domaine

```
<VirtualHost *:80>
    ServerName api.mondomaine.com
    DocumentRoot /var/www/api/public

    <Directory /var/www/api/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/api_error.log
    CustomLog ${APACHE_LOG_DIR}/api_access.log combined

</VirtualHost>
```

### 5. Activation du site et des modules nécessaires
Activé le site et redémarrer Apache2
```sh
sudo a2ensite api-symfony.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 6. Test de l'installation
Tester si l'api fonctionne

avec httpi:
```sh
http GET http://api.mondomaine.com/event
```
avec curl:
```sh
curl http://api.mondomaine.com/event
```