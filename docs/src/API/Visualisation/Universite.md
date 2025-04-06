# Visualisation des universités

Cette documentation explique comment accéder et visualiser les universités associées à un événement via son API.
## Récupérer la liste des universités
### Route
```sh
GET /api/universites
```

Cette route permet de récupérer toutes les universités disponibles.
Réponse

La réponse renverra un tableau JSON contenant les informations sur les universités. Chaque université contiendra les informations suivantes :
```json
[
    {
        "id": 1,
        "nom": "Université de Paris",
        "ville": "Paris"
    },
    {
        "id": 2,
        "nom": "Université de Lyon",
        "ville": "Lyon"
    }
]
```
Description

    - id : L'identifiant unique de l'université.
    - nom : Le nom de l'université.
    - ville : La ville dans laquelle l'université est située.
    - sort : Par quelle Variable Trier
    - order : ASC ou DESC pour gérer le trie


Si aucune université n'est trouvée ou si la base de données est vide, la réponse sera un tableau vide :
```json
[]
```