# Ajouter un Utilisateur

## URL

`/api/add/user`

## Méthode HTTP

`POST`

## Description

Cette API permet d'ajouter un utilisateur dans le système. L'utilisateur peut être créé en fournissant les informations nécessaires via une requête POST. Les informations envoyées doivent être en format JSON.

## Paramètres Requis

### Corps de la Requête (JSON)

Les données envoyées doivent être dans le corps de la requête sous forme de JSON et inclure les champs suivants :

- **nom** (string) : Le nom de l'utilisateur.
- **prenom** (string) : Le prénom de l'utilisateur.
- **mail** (string) : L'adresse e-mail de l'utilisateur. Cette adresse doit être unique dans la base de données.
- **pwd** (string) : Le mot de passe de l'utilisateur. Il sera haché avant d'être stocké.
- **roles** (array|string) : Les rôles de l'utilisateur. Ce champ peut être soit une chaîne JSON représentant un tableau, soit un tableau directement.

### Exemple de Corps de Requête (JSON)

```json
{
    "nom": "Dupont",
    "prenom": "Jean",
    "mail": "jean.dupont@example.com",
    "pwd": "password123",
    "roles": ["ROLE_USER"]
}
```
Réponse

### Code de Réponse HTTP

    201 Created : Utilisateur créé avec succès.

Corps de la Réponse (JSON)

Si l'utilisateur a été ajouté avec succès, la réponse contient les informations suivantes :
```json

{
    "message": "Utilisateur ajouté avec succès.",
    "user": {
        "id": 1,
        "nom": "Dupont",
        "prenom": "Jean",
        "mail": "jean.dupont@example.com",
        "roles": ["ROLE_USER"]
    }
}
```
Codes d'Erreur

    400 Bad Request : Si les données sont manquantes ou invalides, la réponse inclura un message d'erreur détaillant le problème, par exemple :
        Données manquantes pour ajouter un utilisateur.
        Le champ "roles" doit être un JSON valide.

Exemple d'Erreur
```json
{
    "message": "Données manquantes pour ajouter un utilisateur."
}
```