# Suppression d'un événement via l'API 
## Supprimer un événement
### Route
```
DELETE /api/delete/event/{id}
```
Cette route permet de supprimer un événement en fournissant son ID.
### Méthode

    Méthode HTTP : DELETE

    Paramètre requis :

        {id} (int) : L'identifiant unique de l'événement à supprimer.

### Exemple de requête
Requête HTTP
```
DELETE /api/delete/event/7
```

### Réponses
Succès

Si l'événement est supprimé avec succès, la réponse sera :
```json
{
    "message": "Événement supprimé avec succès"
}
```
Code HTTP : 200 OK
Erreurs possibles

    Événement introuvable
    Si l'événement avec l'ID fourni n'existe pas, la réponse sera :
```json
{
    "message": "Événement non trouvé"
}
```
Code HTTP : 404 Not Found