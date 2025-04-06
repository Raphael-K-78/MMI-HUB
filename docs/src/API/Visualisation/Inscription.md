# Visualisation des inscriptions

Cette documentation explique comment accéder et visualiser les inscriptions des utilisateurs à des événements via l'API.
## Récupérer les inscriptions d'un événement
### Route
```sh
GET /api/inscriptions
```

Cette route permet de récupérer toutes les inscriptions d'événements en fonction des paramètres de filtrage : eventId (identifiant de l'événement) et userId (identifiant de l'utilisateur).

### Paramètres

     `eventId` (int) : L'identifiant unique de l'événement pour lequel récupérer les inscriptions (optionnel).

    `userId` (int) : L'identifiant unique de l'utilisateur pour récupérer les inscriptions associées à cet utilisateur (optionnel).

Réponse

La réponse renverra un tableau JSON contenant les informations des inscriptions filtrées. Chaque inscription contient les informations suivantes :
```json
[
    {
        "id": 1,
        "event": "Conférence MMI",
        "user": {
            "nom": "Dupont",
            "prenom": "Jean"
        }
    },
    {
        "id": 2,
        "event": "Séminaire MMI",
        "user": {
            "nom": "Martin",
            "prenom": "Sophie"
        }
    }
]
```

Description

    - id  : L'identifiant unique de l'inscription.
    - event : Le nom de l'événement auquel l'utilisateur est inscrit.
    - user : Informations sur l'utilisateur inscrit, comprenant le nom et le prenom.
    - sort : Par quelle Variable Trier
    - order : ASC ou DESC pour gérer le trie

### Exemple d'URL

    Pour récupérer toutes les inscriptions pour un événement spécifique :
```sh
GET /api/inscriptions?eventId=1
```

Pour récupérer toutes les inscriptions d'un utilisateur spécifique :
```sh
GET /api/inscriptions?userId=2
```
Pour récupérer toutes les inscriptions en fonction d'un événement et d'un utilisateur :
```sh
    GET /api/inscriptions?eventId=1&userId=2
```

Si aucune inscription ne correspond aux critères fournis, la réponse sera un tableau vide :


```json
[]
```