# Suppression d'une inscriptionn via l'API
## Supprimer une inscription
### Route
```
DELETE /api/delete/inscription/{id}
```
Cette route permet de supprimer une inscription en fournissant son ID.
### Méthode

    Méthode HTTP : DELETE

    Paramètre requis :

        - {id} (int) : L'identifiant unique de l'inscription à supprimer.

### Exemple de requête
Requête HTTP
```
DELETE /api/delete/inscription/3
```
### Réponses
Succès

Si l'inscription est supprimée avec succès, la réponse sera :
```json
{
    "message": "Inscription supprimée avec succès"
}
```
Code HTTP : 200 OK
Erreurs possibles

    Inscription introuvable
    Si l'inscription avec l'ID fourni n'existe pas, la réponse sera :
```json
{
    "message": "Inscription non trouvée"
}
```
Code HTTP : 404 Not Found