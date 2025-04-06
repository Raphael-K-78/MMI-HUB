# Ajouter un événement via l'API Symfony

Cette documentation explique comment ajouter un événement à travers un point d'API.

## Ajouter un événement

### Route
```
POST /api/add/event
```

Cette route permet à un utilisateur d'ajouter un événement en fournissant le nom de l'événement, l'ID de l'université, l'ID de l'utilisateur, une image, une description, et la date de l'événement.

### Paramètres

Le corps de la requête doit contenir un JSON avec les paramètres suivants :

- `nom` (string) : Le nom de l'événement.
- `id_univ` (int) : L'ID de l'université associée à l'événement.
- `id_user` (int) : L'ID de l'utilisateur qui crée l'événement.
- `img` (string) : L'URL ou le chemin de l'image associée à l'événement.
- `content` (string) : Le contenu ou la description de l'événement.
- `date` (string) : La date et l'heure de l'événement au format `YYYY-MM-DD HH:MM:SS`.

### Exemple de requête

```json
{
    "nom": "Conférence sur la science",
    "id_univ": 1,
    "id_user": 2,
    "img": "https://example.com/image.jpg",
    "content": "Une conférence sur les dernières découvertes scientifiques.",
    "date": "2025-04-10 10:00:00"
}
```
Réponse

La réponse renverra un objet JSON contenant les informations suivantes en cas de succès :
```json
{
    "message": "Événement ajouté avec succès.",
    "event": {
        "id": 1,
        "nom": "Conférence sur la science",
        "universite": "Université de Paris",
        "user": "Jean Dupont",
        "img": "https://example.com/image.jpg",
        "content": "Une conférence sur les dernières découvertes scientifiques.",
        "date": "2025-04-10 10:00:00"
    }
}
```

Description
- message : Un message indiquant que l'événement a été ajouté avec succès.
- event : Un objet contenant les informations de l'événement ajouté :
- id : L'identifiant unique de l'événement.
- nom : Le nom de l'événement.
- universite : Le nom de l'université associée à l'événement.
- user : Le nom de l'utilisateur qui a créé l'événement.
- img : L'image associée à l'événement.
- content : La description ou le contenu de l'événement.
- date : La date et l'heure de l'événement au format YYYY-MM-DD HH:MM:SS.

Erreurs possibles

Données manquantes : Si une ou plusieurs des informations nécessaires (nom, ID utilisateur, ID université, image, contenu, ou date) sont manquantes dans la requête.

```json
{
    "message": "Données manquantes pour ajouter un événement."
}
```
Code HTTP : 400 Bad Request

Université introuvable : Si l'université avec l'ID spécifié n'existe pas.
```json

{
    "message": "L'université spécifiée n'existe pas."
}
```
Code HTTP : 400 Bad Request

Utilisateur introuvable : Si l'utilisateur avec l'ID spécifié n'existe pas.
```json

{
    "message": "L'utilisateur spécifié n'existe pas."
}
```
Code HTTP : 400 Bad Request
