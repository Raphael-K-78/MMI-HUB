# Suppression d'un commentaire via l'API
## Supprimer un commentaire
### Route
```
DELETE /api/delete/comment/{id}
```
Cette route permet de supprimer un commentaire en fournissant son ID.
Méthode

    Méthode HTTP : DELETE

    Paramètre requis :

        {id} (int) : L'identifiant unique du commentaire à supprimer.

### Exemple de requête
Requête HTTP
```
DELETE /api/delete/comment/12
```

### Réponses
Succès

Si le commentaire est supprimé avec succès, la réponse sera :
```json
{
    "message": "Commentaire supprimé avec succès"
}
```
Code HTTP : 200 OK
Erreurs possibles

    Commentaire introuvable
    Si le commentaire avec l'ID fourni n'existe pas, la réponse sera :
```json
{
    "message": "Commentaire non trouvé"
}
```
Code HTTP : 404 Not Found