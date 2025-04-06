# Ajouter une inscription à un événement 

Cette documentation décrit l'API pour ajouter une inscription à un événement 


## Ajouter une inscription

### Route
```
POST /api/add/inscription
```

Cette route permet à un utilisateur de s'inscrire à un événement en fournissant l'ID de l'utilisateur et l'ID de l'événement.

### Paramètres

Le corps de la requête doit contenir un JSON avec les paramètres suivants :

- `id_user` (int) : L'ID de l'utilisateur qui souhaite s'inscrire.
- `id_event` (int) : L'ID de l'événement auquel l'utilisateur souhaite s'inscrire.

### Exemple de requête

```json
{
    "id_user": 1,
    "id_event": 2
}
```
Réponse

La réponse renverra un objet JSON contenant les informations suivantes en cas de succès :
```json
{
    "message": "Inscription ajoutée avec succès.",
    "inscription": {
        "id": 1,
        "user": "Jean Dupont",
        "event": "Conférence sur la science"
    }
}
```
Description

    message : Un message indiquant que l'inscription a été ajoutée avec succès.
    inscription : Un objet contenant les informations de l'inscription ajoutée :
        id : L'identifiant unique de l'inscription.
        user : Le nom de l'utilisateur inscrit.
        event : Le nom de l'événement auquel l'utilisateur est inscrit.

Erreurs possibles

    Données manquantes : Si l'ID de l'utilisateur ou l'ID de l'événement est manquant.
```json

{
    "message": "Données manquantes pour ajouter une inscription."
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

Événement introuvable : Si l'événement avec l'ID spécifié n'existe pas.
```json

{
    "message": "L'événement spécifié n'existe pas."
}
```
Code HTTP : 400 Bad Request

Utilisateur déjà inscrit : Si l'utilisateur est déjà inscrit à l'événement spécifié.
```json

{
    "message": "L'utilisateur est déjà inscrit à cet événement."
}
```
Code HTTP : 400 Bad Request