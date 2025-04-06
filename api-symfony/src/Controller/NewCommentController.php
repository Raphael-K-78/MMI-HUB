<?php
namespace App\Controller;

use App\Entity\Commentaire;
use App\Entity\User;
use App\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NewCommentController extends AbstractController
{
    #[Route('/api/add/comment', name: 'api_add_commentaire', methods: ['POST'])]
    public function addCommentaire(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les données JSON envoyées
        $data = json_decode($request->getContent(), true);

        // Vérifier si les données nécessaires sont présentes
        if (empty($data['user_id']) || empty($data['event_id']) || empty($data['content'])) {
            throw new BadRequestHttpException('Données manquantes pour ajouter un commentaire.');
        }

        // Récupérer l'utilisateur et l'événement depuis la base de données
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        $event = $entityManager->getRepository(Event::class)->find($data['event_id']);

        // Vérifier si l'utilisateur et l'événement existent
        if (!$user) {
            throw new BadRequestHttpException('Utilisateur introuvable.');
        }

        if (!$event) {
            throw new BadRequestHttpException('Événement introuvable.');
        }

        // Créer un nouveau commentaire
        $commentaire = new Commentaire();
        $commentaire->setUser($user);
        $commentaire->setEvent($event);
        $commentaire->setContent($data['content']);

        // Enregistrer le commentaire dans la base de données
        $entityManager->persist($commentaire);
        $entityManager->flush();

        // Retourner une réponse JSON avec les informations du commentaire ajouté
        return new JsonResponse([
            'message' => 'Commentaire ajouté avec succès.',
            'commentaire' => [
                'id' => $commentaire->getIdComment(),
                'user' => $user->getId(),
                'event' => $event->getId(),
                'content' => $commentaire->getContent(),
            ]
        ], JsonResponse::HTTP_CREATED);
    }
}
