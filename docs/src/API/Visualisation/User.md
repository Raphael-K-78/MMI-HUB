# Visualisation des utilisateurs

Cette documentation explique comment accéder et visualiser les utilisateurs via leur API.
## Récupérer un utilisateur par ID
### Route
```sh
GET /api/user/{id}
```

Cette route permet de récupérer un utilisateur spécifique en fonction de son identifiant unique (id).

### Paramètres

    `id` (int) : L'identifiant unique de l'utilisateur.

Réponse

La réponse renverra un objet JSON contenant les informations de l'utilisateur spécifié. Les données renvoyées pour l'utilisateur seront les suivantes :
```json
{
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com"
}
```

Description

    - id : L'identifiant unique de l'utilisateur.
    - nom: Le nom de l'utilisateur.
    - prenom : Le prénom de l'utilisateur.
    - email : L'adresse email de l'utilisateur.
    - sort : Par quelle Variable Trier
    - order : ASC ou DESC pour gérer le trie


Si l'utilisateur n'est pas trouvé, une erreur 404 sera renvoyée avec le message suivant :

```json
{
    "message": "Utilisateur non trouvé"
}
```

## Récupérer tous les utilisateurs
### Route
```sh
GET /api/user
```

Cette route permet de récupérer la liste de tous les utilisateurs.
Réponse

La réponse renverra un tableau JSON contenant les informations de tous les utilisateurs. Chaque utilisateur contiendra les informations suivantes :
```json
[
    {
        "id": 1,
        "nom": "Dupont",
        "prenom": "Jean",
        "email": "jean.dupont@example.com"
    },
    {
        "id": 2,
        "nom": "Martin",
        "prenom": "Sophie",
        "email": "sophie.martin@example.com"
    }
]
```
