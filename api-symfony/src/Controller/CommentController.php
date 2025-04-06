<?php
// src/Controller/CommentController.php

namespace App\Controller;

use App\Entity\Commentaire;
use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CommentController extends AbstractController
{
    // #[Route('/api/comment', name: 'api_comment-all', methods: ['GET'])]
    // public function getAllComments(EntityManagerInterface $entityManager)
    // {
    //     //$comments = $entityManager->getRepository(Commentaire::class)->
    // }

    // Route pour récupérer les commentaires d'un événement spécifique par ID avec tri
    #[Route('/api/comment/{id}', name: 'api_comment', methods: ['GET'])]
    public function getCommentsByEventId(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'événement spécifique par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        // Si l'événement n'existe pas, on renvoie une erreur 404
        if (!$event) {
            throw new NotFoundHttpException('Événement non trouvé');
        }

        // Récupérer les paramètres de tri (par défaut tri par 'date' et ordre 'asc')
        $sort = $request->query->get('sort', 'event');  // Champ de tri, par défaut 'date'
        $order = $request->query->get('order', 'asc');  // Ordre de tri, par défaut 'asc'

        // Validation de l'ordre (asc ou desc)
        if (!in_array(strtolower($order), ['asc', 'desc'])) {
            $order = 'asc';  // Si l'ordre n'est pas valide, on remet à 'asc'
        }

        // Créer une requête pour récupérer les commentaires associés à l'événement, avec tri
        $queryBuilder = $entityManager->getRepository(Commentaire::class)->createQueryBuilder('c')
            ->where('c.event = :event')
            ->setParameter('event', $event);

        // Appliquer le tri
        $queryBuilder->orderBy('c.' . $sort, $order);

        // Exécuter la requête
        $commentaires = $queryBuilder->getQuery()->getResult();

        // Construire un tableau de commentaires
        $commentairesData = [];
        foreach ($commentaires as $commentaire) {
            $commentairesData[] = [
                'id_comment' => $commentaire->getIdComment(),
                'content' => htmlspecialchars($commentaire->getContent(), ENT_QUOTES, 'UTF-8'),
                'user' => [
                    'nom' => $commentaire->getUser()->getNom(),
                    'prenom' => $commentaire->getUser()->getPrenom(),
                    'id' => $commentaire->getUser()->getId()
                    // 'mail' => $commentaire->getUser()->getMail(),
                ],
            ];
        }

        // Retourner les commentaires sous forme de JSON
        return new JsonResponse($commentairesData);
    }
}
