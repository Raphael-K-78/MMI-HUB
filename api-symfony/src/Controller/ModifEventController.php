<?php
// src/Controller/EventController.php

namespace App\Controller;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ModifEventController extends AbstractController
{
    // Route pour modifier un événement
    #[Route('/api/modif/event/{id}', name: 'api_modify_event', methods: ['PUT'])]
    public function modifyEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        // Si l'événement n'existe pas, on renvoie une erreur 404
        if (!$event) {
            throw new NotFoundHttpException('Événement non trouvé');
        }

        // Récupérer les données envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Si les données sont vides ou invalides
        if (!$data) {
            return new JsonResponse(['message' => 'Données invalides'], 400);
        }

        // Mettre à jour les propriétés de l'événement avec les données de la requête
        if (isset($data['nom'])) {
            $event->setNom($data['nom']);
        }
        if (isset($data['date'])) {
            $event->setDate(new \DateTimeImmutable($data['date']));
        }
        if (isset($data['content'])) {
            $event->setContent($data['content']);
        }
        if (isset($data['img'])) {
            $event->setImg($data['img']);
        }

        // Sauvegarder l'événement modifié en base de données
        $entityManager->flush();

        // Retourner la réponse avec les nouvelles informations de l'événement
        return new JsonResponse([
            'id_event' => $event->getId(),
            'nom' => $event->getNom(),
            'date' => $event->getDate()->format('Y-m-d H:i:s'),
            'content' => $event->getContent(),
            'img' => $event->getImg(),
        ]);
    }
}
