# Modification d'un événement via l'API
## Modifier un événement
### Route
```
PUT /api/modif/event/{id}
```
Cette route permet de modifier un événement en fournissant son ID et les nouvelles valeurs à mettre à jour.
### Méthode

    Méthode HTTP : PUT

    Paramètres requis :

        - {id} (int) : L'identifiant unique de l'événement à modifier.

        Corps de la requête (JSON) :s
            - nom (string, optionnel) : Nouveau nom de l'événement.
            - date (string, optionnel, format YYYY-MM-DD HH:MM:SS) : Nouvelle date et heure de l'événement.
            - content (string, optionnel) : Nouvelle description de l'événement.
            - img (string, optionnel) : Nouvelle image associée à l'événement.

### Exemple de requête
Requête HTTP
```
PUT /api/modif/event/3
```
Corps de la requête (JSON)
```json
{
    "nom": "Conférence mise à jour",
    "date": "2025-05-15 14:00:00",
    "content": "Mise à jour de la description de l'événement.",
    "img": "https://example.com/new-image.jpg"
}
```
### Réponses
Succès

Si l'événement est modifié avec succès, la réponse sera :
```json
{
    "id_event": 3,
    "nom": "Conférence mise à jour",
    "date": "2025-05-15 14:00:00",
    "content": "Mise à jour de la description de l'événement.",
    "img": "https://example.com/new-image.jpg"
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

Données invalides
Si le corps de la requête est vide ou invalide, la réponse sera :
```json
{
    "message": "Données invalides"
}
```
Code HTTP : 400 Bad Request