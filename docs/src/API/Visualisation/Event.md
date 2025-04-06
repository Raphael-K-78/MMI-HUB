# Visualisation des événements 
Cette documentation explique comment accéder et visualiser les événements du site MMI HUB grâce à son API

### Routes disponibles

1. **Récupérer un événement spécifique par ID**
2. **Récupérer tous les événements avec filtres**

## 1. Récupérer un événement spécifique par ID

### Route
```
GET /api/event/{id}
```


Cette route permet de récupérer les informations d'un événement spécifique en fonction de son identifiant unique (`id`).

### Paramètres

- `id` (int) : L'identifiant unique de l'événement. 

### Réponse

La réponse renverra un objet JSON contenant les informations suivantes :

```json
{
    "id_event": 1,
    "nom": "Nom de l'événement",
    "img": "url_de_l_image.jpg",
    "content": "Description de l'événement",
    "date": "2025-03-21",
    "creator": {
        "nom": "Nom du créateur",
        "prenom": "Prénom du créateur"
    },
    "lieu": "Université XYZ",
    "ville": "Ville de l'université"
}
```
### Description

    - id_event : L'identifiant de l'événement.
    - nom : Le nom de l'événement.
    - img : L'URL de l'image associée à l'événement.
    - content : Description de l'événement.
    - date : La date de l'événement au format YYYY-MM-DD.
    - creator : Informations sur le créateur de l'événement.
    - lieu : Nom de l'université associée à l'événement.
    - ville : Ville où se situe l'université.
    - sort : Par quelle Variable Trier
    - order : ASC ou DESC pour gérer le trie

Si l'événement n'est pas trouvé, une erreur 404 sera renvoyée.

## 2. Récupérer tous les événements avec filtres
### Route
```
GET /api/event
```
Cette route permet de récupérer une liste d'événements avec différents filtres. Vous pouvez ajouter des paramètres de requête pour filtrer les événements selon plusieurs critères.
#### Paramètres disponibles
- `date` (optionnel) : Permet de filtrer les événements en fonction de la date  
    - 1 : Événements futurs uniquement. 
    - YYYY-MM-DD : Événements ayant lieu à une date précise.
- `creator` (optionnel) : Filtre les événements par identifiant du créateur.- `position` (optionnel) : Filtre les événements en fonction de la ville de l'université associée.
- `name` (optionnel) : Filtre les événements en fonction du nom de l'événement.

### Exemple d'URL
```
GET /api/event?date=1&creator=123&position=Paris&name=Conférence
```
### Réponse

La réponse renverra un tableau JSON avec les événements filtrés. Par exemple :

```json
[
    {
        "id_event": 1,
        "nom": "Conférence Symfony",
        "img": "url_image1.jpg",
        "date": "2025-03-21 10:00:00",
        "content": "Une conférence sur Symfony",
        "creator": {
            "id": 123,
            "nom": "Dupont",
            "prenom": "Jean"
        },
        "lieu": "Université ABC",
        "ville": "Paris"
    },
    {
        "id_event": 2,
        "nom": "Atelier Symfony",
        "img": "url_image2.jpg",
        "date": "2025-03-22 14:00:00",
        "content": "Un atelier pratique sur Symfony",
        "creator": {
            "id": 123,
            "nom": "Dupont",
            "prenom": "Jean"
        },
        "lieu": "Université ABC",
        "ville": "Paris"
    }
]
```

Si aucun événement ne correspond aux critères, la réponse sera la suivante :
```json
{
    "message": "Aucun événement trouvé avec ces critères"
}
```