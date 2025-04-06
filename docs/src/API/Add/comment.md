# Ajouter un commentaire 

Cette documentation explique comment ajouter un commentaire à un événement spécifique via un point d'API.

### Route disponible

1. **Ajouter un commentaire à un événement**

## 1. Ajouter un commentaire à un événement

### Route
```
POST /api/add/comment
```

Cette route permet à un utilisateur d'ajouter un commentaire à un événement en fournissant son ID, l'ID de l'événement, et le contenu du commentaire.

### Paramètres

Le corps de la requête doit contenir un JSON avec les paramètres suivants :

- `user_id` (int) : L'ID de l'utilisateur qui ajoute le commentaire.
- `event_id` (int) : L'ID de l'événement auquel le commentaire est associé.
- `content` (string) : Le contenu du commentaire.

### Exemple de requête

```json
{
    "user_id": 1,
    "event_id": 2,
    "content": "C'est un événement incroyable !"
}
```
### Réponse

La réponse renverra un objet JSON contenant les informations suivantes en cas de succès :
```json
{
    "message": "Commentaire ajouté avec succès.",
    "commentaire": {
        "id": 1,
        "user": 1,
        "event": 2,
        "content": "C'est un événement incroyable !"
    }
}
```
### Description

    - message : Un message indiquant que le commentaire a été ajouté avec succès.
    - commentaire : Un objet contenant les informations du commentaire ajouté :
    - id : L'identifiant unique du commentaire.
    - user : L'ID de l'utilisateur qui a ajouté le commentaire.
    - event : L'ID de l'événement auquel le commentaire est associé.
    - content : Le contenu du commentaire.

Si des informations sont manquantes ou incorrectes, la réponse sera un message d'erreur avec le code HTTP 400 (Bad Request).
Erreurs possibles

    Données manquantes : Si l'ID de l'utilisateur, l'ID de l'événement ou le contenu du commentaire sont manquants dans la requête.
```json
{
    "message": "Données manquantes pour ajouter un commentaire."
}
```
Code HTTP : 400 Bad Request

Utilisateur introuvable : Si l'utilisateur avec l'ID fourni n'existe pas dans la base de données.
```json
{
    "message": "Utilisateur introuvable."
}
```
Code HTTP : 400 Bad Request

Événement introuvable : Si l'événement avec l'ID fourni n'existe pas dans la base de données.
```
{
    "message": "Événement introuvable."
}
```
Code HTTP : 400 Bad Request