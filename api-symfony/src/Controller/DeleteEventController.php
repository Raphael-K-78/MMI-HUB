<?php
// src/Controller/EventController.php

namespace App\Controller;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteEventController extends AbstractController
{
    // Route pour supprimer un événement avec l'URL /api/delete/event/{id}
    #[Route('/api/delete/event/{id}', name: 'api_delete_event', methods: ['DELETE'])]
    public function deleteEvent(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Trouver l'événement par son ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        // Si l'événement n'existe pas, renvoyer une erreur 404
        if (!$event) {
            throw new NotFoundHttpException('Événement non trouvé');
        }

        // Supprimer l'événement
        $entityManager->remove($event);
        $entityManager->flush();

        // Retourner une réponse JSON de succès
        return new JsonResponse(['message' => 'Événement supprimé avec succès'], 200);
    }
}
