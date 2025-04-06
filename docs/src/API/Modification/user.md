# Modification des informations d'un utilisateur via l'API 
## Modifier un utilisateur
### Route
```
PUT /api/modif/user/{id}
```
Cette route permet de modifier un utilisateur en fournissant son ID et les nouvelles informations à mettre à jour.
### Méthode

    Méthode HTTP : PUT

    Paramètres requis :

        - {id} (int) : L'identifiant unique de l'utilisateur à modifier.

        Corps de la requête (JSON) (au moins un champ doit être fourni) :

            - nom (string, optionnel) : Nouveau nom de l'utilisateur.
            - prenom (string, optionnel) : Nouveau prénom de l'utilisateur.
            - mail (string, optionnel) : Nouvelle adresse e-mail de l'utilisateur.
            - status (booléen, optionnel) : Nouveau statut de l'utilisateur (true ou false).

### Exemple de requête
Requête HTTP
```
PUT /api/modif/user/7
```
Corps de la requête (JSON)
```json
{
    "nom": "Dupont",
    "prenom": "Jean",
    "mail": "jean.dupont@example.com",
    "status": true
}
```
### Réponses
Succès

Si l'utilisateur est modifié avec succès, la réponse sera :
```json
{
    "message": "Utilisateur modifié avec succès",
    "user": {
        "id": 7,
        "nom": "Dupont",
        "prenom": "Jean",
        "email": "jean.dupont@example.com",
        "status": true
    }
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

Données invalides ou requête vide
Si le corps de la requête est vide ou ne contient aucun champ modifiable, la réponse sera :
```json
{
    "message": "Données invalides"
}
```
Code HTTP : 400 Bad Request