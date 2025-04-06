# Connexion via l'API 

Cette documentation explique comment effectuer une connexion via l'API Symfony, en utilisant un point d'API qui vérifie l'email et le mot de passe d'un utilisateur.

### Route
```
POST /api/login
```

Cette route permet à un utilisateur de se connecter à l'application en envoyant un email et un mot de passe. 

### Paramètres

Le corps de la requête doit contenir un JSON avec les paramètres suivants :

- `mail` (string) : L'email de l'utilisateur.
- `pwd` (string) : Le mot de passe de l'utilisateur.

### Exemple de requête

```json
{
    "mail": "user@example.com",
    "pwd": "password123"
}
```
### Réponse

La réponse renverra un objet JSON contenant les informations suivantes en cas de connexion réussie :
```json
{
    "message": "Connexion réussie.",
    "user": {
        "id": 1,
        "nom": "Dupont",
        "prenom": "Jean",
        "mail": "user@example.com",
        "roles": ["ROLE_USER"]
    }
}
```
### Description

    - message : Un message indiquant que la connexion a réussi.
    - user : Un objet contenant les informations de l'utilisateur :
    -id : L'identifiant de l'utilisateur.
    - nom : Le nom de l'utilisateur.
    - prenom : Le prénom de l'utilisateur.
    - mail : L'email de l'utilisateur.
    - roles : Les rôles associés à l'utilisateur.

Si les informations de connexion sont incorrectes ou manquantes, la réponse sera un message d'erreur avec le code HTTP 401 (Unauthorized).
Erreurs possibles

    Données manquantes : Si l'email ou le mot de passe sont manquants dans la requête.

```json
{
    "message": "Données manquantes pour la connexion."
}
```
Code HTTP : 401 Unauthorized

Utilisateur non trouvé : Si l'email n'est pas associé à un utilisateur dans la base de données.
```json
{
    "message": "Utilisateur non trouvé."
}
```
Code HTTP : 401 Unauthorized

Mot de passe incorrect : Si le mot de passe fourni ne correspond pas à celui enregistré pour l'utilisateur.
```json
{
    "message": "Mot de passe incorrect."
}
```
Code HTTP : 401 Unauthorized