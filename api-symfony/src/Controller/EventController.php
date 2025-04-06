<?php
// src/Controller/EventController.php

namespace App\Controller;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EventController extends AbstractController
{
    // Route pour récupérer un événement spécifique par ID
    #[Route('/api/event/{id}', name: 'api_event', methods: ['GET'])]
    public function getEvent(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'événement spécifique en fonction de l'ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        // Si l'événement n'existe pas, on renvoie une erreur 404
        if (!$event) {
            throw new NotFoundHttpException('Événement non trouvé');
        }

        // Récupérer les informations associées à cet événement
        $user = $event->getUser(); // Créateur de l'événement
        $universite = $event->getUniversite(); // Université associée

        // Construire la réponse JSON
        $data = [
            'id_event' => $event->getId(),
            'nom' => $event->getNom(),
            'img' => $event->getImg(),
            'content'=> $event->getContent(),
            'date'=>$event->getdate()->format('Y-m-d\TH:i:s'),
            'creator' => [
                'nom' => $user ? $user->getNom() : null,
                'prenom' => $user ? $user->getPrenom() : null,
                // 'mail' => $user ? $user->getMail() : null
            ],
            'lieu' => $universite ? $universite->getNom() : null,
            'ville' => $universite ? $universite->getVille() : null,
        ];

        // Retourner les données de l'événement sous forme de JSON
        return new JsonResponse($data);
    }
}
?>