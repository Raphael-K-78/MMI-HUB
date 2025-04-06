<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NewUserController extends AbstractController
{
    #[Route('/api/add/user', name: 'api_add_user', methods: ['POST'])]
    public function addUser(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si toutes les données nécessaires sont présentes
        if (empty($data['nom']) || empty($data['prenom']) || empty($data['mail']) || empty($data['pwd']) || empty($data['roles'])) {
            throw new BadRequestHttpException('Données manquantes pour ajouter un utilisateur.');
        }

        // Vérifier si "roles" est déjà un tableau ou une chaîne JSON à décoder
        if (is_string($data['roles'])) {
            $roles = json_decode($data['roles'], true); // Si "roles" est une chaîne JSON, le décoder
            if ($roles === null) {
                throw new BadRequestHttpException('Le champ "roles" doit être un JSON valide.');
            }
        } elseif (is_array($data['roles'])) {
            $roles = $data['roles']; // Si "roles" est déjà un tableau, on l'utilise directement
        } else {
            throw new BadRequestHttpException('Le champ "roles" doit être un tableau ou une chaîne JSON valide.');
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setMail($data['mail']);
        $user->setPwd(password_hash($data['pwd'], PASSWORD_BCRYPT)); // Assurez-vous de stocker les mots de passe de manière sécurisée
        $user->setRoles($roles);
        $user->setStatus(true); // Par défaut, le statut est 1 (actif)

        // Enregistrer l'utilisateur dans la base de données
        $entityManager->persist($user);
        $entityManager->flush();

        // Retourner une réponse JSON avec les informations de l'utilisateur ajouté
        return new JsonResponse([
            'message' => 'Utilisateur ajouté avec succès.',
            'user' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'mail' => $user->getMail(),
                'roles' => $user->getRoles(),
            ]
        ], JsonResponse::HTTP_CREATED);
    }
}
