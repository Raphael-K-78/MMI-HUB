<?php
// src/Controller/ModifStatusController.php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ModifStatusController extends AbstractController
{
    #[Route('/api/modif/status/{email}', name: 'api_modif_status', methods: ['PUT'])]
    public function modifyStatus(string $email, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'utilisateur par email
        $user = $entityManager->getRepository(User::class)->findOneBy(['mail' => $email]);

        // Vérifier si l'utilisateur existe
        if (!$user) {
            throw new NotFoundHttpException('Utilisateur non trouvé');
        }

        // Basculer le statut (1 -> 0 ou 0 -> 1)
        $newStatus = !$user->isStatus();
        $user->setStatus($newStatus);

        // Sauvegarder les modifications dans la base de données
        $entityManager->flush();

        // Retourner une réponse JSON avec le nouveau statut
        return new JsonResponse([
            'message' => 'Statut modifié avec succès',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getMail(),
                'status' => $user->isStatus(),
            ]
        ]);
    }
}
