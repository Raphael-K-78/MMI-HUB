<?php
namespace App\Controller;

use App\Entity\Inscription;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class InscriptionController extends AbstractController
{
    #[Route('/api/inscriptions', name: 'api_inscriptions', methods: ['GET'])]
    public function getInscriptions(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les paramètres GET
        $eventId = $request->query->get('eventId');
        $userId = $request->query->get('userId');

        // Récupérer les paramètres de tri
        $sort = $request->query->get('sort', 'user');  // Par défaut tri par 'user'
        $order = $request->query->get('order', 'asc');  // Par défaut ordre ascendant

        // Vérifier si l'ordre est valide
        if (!in_array(strtolower($order), ['asc', 'desc'])) {
            $order = 'asc';  // Si l'ordre n'est pas valide, on le remet par défaut à 'asc'
        }

        // Construire les critères de filtrage
        $criteria = [];
        if ($eventId) {
            $criteria['event'] = $eventId;
        }
        if ($userId) {
            $criteria['user'] = $userId;
        }

        // Récupérer les inscriptions avec tri
        $queryBuilder = $entityManager->getRepository(Inscription::class)->createQueryBuilder('i')
            ->leftJoin('i.event', 'e')
            ->leftJoin('i.user', 'u');

        // Appliquer les filtres
        if ($eventId) {
            $queryBuilder->andWhere('e.id = :eventId')->setParameter('eventId', $eventId);
        }
        if ($userId) {
            $queryBuilder->andWhere('u.id = :userId')->setParameter('userId', $userId);
        }

        // Ajouter le tri à la requête
        $queryBuilder->orderBy('i.' . $sort, $order);

        // Exécuter la requête
        $inscriptions = $queryBuilder->getQuery()->getResult();

        // Transformer les résultats en tableau de données
        $inscriptionsData = array_map(function ($inscription) {
            return [
                'id' => $inscription->getIdInscription(),
                'event' => $inscription->getEvent()->getNom(),
                'user' => [
                    'nom' => $inscription->getUser()->getNom(),
                    'prenom' => $inscription->getUser()->getPrenom(),
                ],
            ];
        }, $inscriptions);

        return $this->json($inscriptionsData);
    }
}
