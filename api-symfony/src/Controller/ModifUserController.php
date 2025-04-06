<?php
// src/Controller/UserController.php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ModifUserController extends AbstractController
{
    // Route pour modifier un utilisateur
    #[Route('/api/modif/user/{id}', name: 'api_modif_user', methods: ['PUT'])]
    public function modifyUser(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'utilisateur par ID
        $user = $entityManager->getRepository(User::class)->find($id);

        // Vérifier si l'utilisateur existe
        if (!$user) {
            throw new NotFoundHttpException('Utilisateur non trouvé');
        }

        // Récupérer les données du corps de la requête
        $data = json_decode($request->getContent(), true);

        // Mettre à jour les informations de l'utilisateur
        if (isset($data['nom'])) {
            $user->setNom($data['nom']);
        }
        if (isset($data['prenom'])) {
            $user->setPrenom($data['prenom']);
        }
        if (isset($data['mail'])) {
            $user->setMail($data['mail']);
        }
        if (isset($data['status'])) {
            $user->setStatus($data['status']);
        }

        // Sauvegarder les modifications dans la base de données
        $entityManager->flush();

        // Retourner une réponse JSON avec les nouvelles informations de l'utilisateur
        return new JsonResponse([
            'message' => 'Utilisateur modifié avec succès',
            'user' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'email' => $user->getMail(),
                'status' => $user->isStatus(),
            ]
        ]);
    }
}
