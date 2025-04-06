# Visualisation des commentaires 
Cette documentation explique comment accéder et visualiser les commentaires associés à un événement de MMI-HUB via son API

## Récupérer les commentaires d'un événement spécifique par ID

### Route
```
GET /api/comment/{id}
```

Cette route permet de récupérer tous les commentaires associés à un événement spécifique en fonction de son identifiant unique (`id`).

### Paramètres

- `id` (int) : L'identifiant unique de l'événement.

### Réponse

La réponse renverra un tableau JSON contenant les commentaires associés à l'événement spécifié. Chaque commentaire contiendra les informations suivantes :

```json
[
    {
        "id_comment": 1,
        "content": "C'est un événement très intéressant!",
        "user": {
            "nom": "Dupont",
            "prenom": "Jean"
        }
    },
    {
        "id_comment": 2,
        "content": "J'ai hâte d'y participer!",
        "user": {
            "nom": "Martin",
            "prenom": "Sophie"
        }
    }
]
```

### Description

    - `id_comment` : L'identifiant unique du commentaire.
    -`content` : Le contenu du commentaire.
    - `user` : Informations sur l'utilisateur qui a écrit le commentaire (nom et prénom).

Si l'événement n'est pas trouvé, une erreur 404 sera renvoyée :
```json
{
    "message": "Événement non trouvé"
}
```