# Modification du statut d'un utilisateur via l'API 
## Modifier le statut d'un utilisateur
### Route
```
PUT /api/modif/status/{email}
```
Cette route permet de modifier le statut d'un utilisateur en fournissant son adresse e-mail. Le statut bascule entre 1 et 0.
Méthode

    Méthode HTTP : PUT

    Paramètres requis :

        - {email} (string) : L'adresse e-mail de l'utilisateur dont le statut doit être modifié.

### Exemple de requête
Requête HTTP
```
PUT /api/modif/status/john.doe@example.com
```
### Réponses
Succès

Si le statut de l'utilisateur est modifié avec succès, la réponse sera :
```json
{
    "message": "Statut modifié avec succès",
    "user": {
        "id": 5,
        "email": "john.doe@example.com",
        "status": true
    }
}
```
Code HTTP : 200 OK
Erreurs possibles

    Utilisateur introuvable
    Si l'utilisateur avec l'e-mail fourni n'existe pas, la réponse sera :
```json
{
    "message": "Utilisateur non trouvé"
}
```
Code HTTP : 404 Not Found