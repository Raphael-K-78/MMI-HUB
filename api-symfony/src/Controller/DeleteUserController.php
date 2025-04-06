<?php
// src/Controller/UserController.php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteUserController extends AbstractController
{
    // Route pour supprimer un utilisateur avec l'URL /api/delete/user/{id}
    #[Route('/api/delete/user/{id}', name: 'api_delete_user', methods: ['DELETE'])]
    public function deleteUser(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Trouver l'utilisateur par son ID
        $user = $entityManager->getRepository(User::class)->find($id);

        // Si l'utilisateur n'existe pas, renvoyer une erreur 404
        if (!$user) {
            throw new NotFoundHttpException('Utilisateur non trouvé');
        }

        // Supprimer l'utilisateur
        $entityManager->remove($user);
        $entityManager->flush();

        // Retourner une réponse JSON de succès
        return new JsonResponse(['message' => 'Utilisateur supprimé avec succès'], 200);
    }
}
