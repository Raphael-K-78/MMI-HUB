# Suppression d'un utilisateur via l'API
## Supprimer un utilisateur
### Route
```
DELETE /api/delete/user/{id}
```
Cette route permet de supprimer un utilisateur en fournissant son ID.
Méthode

    Méthode HTTP : DELETE

    Paramètre requis :

        - {id} (int) : L'identifiant unique de l'utilisateur à supprimer.

### Exemple de requête
Requête HTTP
```
DELETE /api/delete/user/5
```

### Réponses
Succès

Si l'utilisateur est supprimé avec succès, la réponse sera :
```json
{
    "message": "Utilisateur supprimé avec succès"
}
```

Code HTTP : 200 OK
Erreurs possibles

    Utilisateur introuvable
    Si l'utilisateur avec l'ID fourni n'existe pas, la réponse sera :
```json
{
    "message": "Utilisateur non trouvé"
}
```
Code HTTP : 404 Not Found