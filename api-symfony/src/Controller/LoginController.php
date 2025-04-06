<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si l'email et le mot de passe sont fournis
        if (empty($data['mail']) || empty($data['pwd'])) {
            throw new UnauthorizedHttpException('Données manquantes pour la connexion.');
        }

        // Récupérer l'utilisateur à partir de l'email
        $user = $entityManager->getRepository(User::class)->findOneBy(['mail' => $data['mail']]);

        // Vérifier si l'utilisateur existe
        if (!$user) {
            throw new UnauthorizedHttpException('Utilisateur non trouvé.');
        }

        // Vérifier si le mot de passe est correct en utilisant password_verify
        if (!password_verify($data['pwd'], $user->getPwd())) {
            throw new UnauthorizedHttpException('Mot de passe incorrect.');
        }

        // Si l'utilisateur existe et que le mot de passe est correct, retourner une réponse avec l'ID et d'autres infos utilisateur
        return new JsonResponse([
            'message' => 'Connexion réussie.',
            'user' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'mail' => $user->getMail(),
                'roles' => $user->getRoles(),
            ]
        ], JsonResponse::HTTP_OK);
    }
}
