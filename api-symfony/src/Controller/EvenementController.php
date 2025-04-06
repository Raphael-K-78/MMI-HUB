<?php
// src/Controller/EventsController.php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Inscription;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class EvenementController extends AbstractController
{
    #[Route('/api/event', name: 'api_events', methods: ['GET'])]
    public function getEvents(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        // Récupérer les paramètres GET
        $dateFilter = $request->query->get('date'); 
        $creatorId = $request->query->get('creator'); 
        $position = $request->query->get('position'); 
        $eventName = $request->query->get('name'); 
        $userId = $request->query->get('user'); 
        
        // Récupérer les paramètres de tri
        $sort = $request->query->get('sort', 'date');  
        $order = $request->query->get('order', 'asc');  

        if (!in_array(strtolower($order), ['asc', 'desc'])) {
            $order = 'asc';
        }

        $queryBuilder = $entityManager->getRepository(Event::class)->createQueryBuilder('e')
            ->leftJoin('e.user', 'u') 
            ->leftJoin('e.universite', 'univ'); 

        // Filtres
        if ($dateFilter == "1") {
            $now = new \DateTimeImmutable();
            $queryBuilder->andWhere('e.date >= :now')->setParameter('now', $now);
        } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateFilter)) {
            $dateStart = new \DateTimeImmutable($dateFilter . ' 00:00:00');
            $dateEnd = new \DateTimeImmutable($dateFilter . ' 23:59:59');
            $queryBuilder->andWhere('e.date BETWEEN :start AND :end')
                         ->setParameter('start', $dateStart)
                         ->setParameter('end', $dateEnd);
        }

        if ($creatorId) {
            $queryBuilder->andWhere('u.id = :creatorId')->setParameter('creatorId', $creatorId);
        }

        if ($position) {
            $queryBuilder->andWhere('univ.ville LIKE :position')
                         ->setParameter('position', '%' . $position . '%');
        }

        if ($eventName) {
            $queryBuilder->andWhere('e.nom LIKE :eventName')
                         ->setParameter('eventName', '%' . $eventName . '%');
        }

        $queryBuilder->orderBy('e.' . $sort, $order);

        $events = $queryBuilder->getQuery()->getResult();

        // Préparer les données
        $data = [];

        foreach ($events as $event) {
            $user = $event->getUser(); 
            $universite = $event->getUniversite(); 

            // Vérifier si l'utilisateur est inscrit à cet événement
            $isRegistered = false;
            if ($userId) {
                $inscription = $entityManager->getRepository(Inscription::class)->findOneBy([
                    'event' => $event,
                    'user' => $userId,
                ]);
                $isRegistered = $inscription !== null;
            }

            $data[] = [
                'id_event' => $event->getId(),
                'nom' => $event->getNom(),
                'img' => $event->getImg(),
                'date' => $event->getDate()->format('Y-m-d H:i:s'),
                'content' => $event->getContent(),
                'creator' => [
                    'id' => $user ? $user->getId() : null,
                    'nom' => $user ? $user->getNom() : null,
                    'prenom' => $user ? $user->getPrenom() : null,
                ],
                'lieu' => $universite ? $universite->getNom() : null,
                'ville' => $universite ? $universite->getVille() : null,
                'isRegistered' => $isRegistered,
            ];
        }

        if (empty($data)) {
            return new JsonResponse(['message' => 'Aucun événement trouvé avec ces critères'], 404);
        }

        return new JsonResponse($data);
    }
}
