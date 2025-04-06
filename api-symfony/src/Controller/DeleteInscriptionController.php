<?php
// src/Controller/InscriptionController.php

namespace App\Controller;

use App\Entity\Inscription;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteInscriptionController extends AbstractController
{
    // Route pour supprimer une inscription avec l'URL /api/delete/inscription/{id}
    #[Route('/api/delete/inscription/{id}', name: 'api_delete_inscription', methods: ['DELETE'])]
    public function deleteInscription(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Trouver l'inscription par son ID
        $inscription = $entityManager->getRepository(Inscription::class)->find($id);

        // Si l'inscription n'existe pas, renvoyer une erreur 404
        if (!$inscription) {
            throw new NotFoundHttpException('Inscription non trouvée');
        }

        // Supprimer l'inscription
        $entityManager->remove($inscription);
        $entityManager->flush();

        // Retourner une réponse JSON de succès
        return new JsonResponse(['message' => 'Inscription supprimée avec succès'], 200);
    }
}
