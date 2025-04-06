<?php
namespace App\Controller;

use App\Entity\Event;
use App\Entity\Universite;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NewEventController extends AbstractController
{
    #[Route('/api/add/event', name: 'api_add_event', methods: ['POST'])]
    public function addEvent(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si toutes les données nécessaires sont présentes
        if (empty($data['nom']) || empty($data['id_univ']) || empty($data['id_user']) || empty($data['img']) || empty($data['content']) || empty($data['date'])) {
            throw new BadRequestHttpException('Données manquantes pour ajouter un événement.');
        }

        // Récupérer l'université et l'utilisateur en fonction des identifiants fournis
        $universite = $entityManager->getRepository(Universite::class)->find($data['id_univ']);
        $user = $entityManager->getRepository(User::class)->find($data['id_user']);

        if (!$universite) {
            throw new BadRequestHttpException('L\'université spécifiée n\'existe pas.');
        }

        if (!$user) {
            throw new BadRequestHttpException('L\'utilisateur spécifié n\'existe pas.');
        }

        // Créer un nouvel événement
        $event = new Event();
        $event->setNom($data['nom']);
        $event->setUniversite($universite);
        $event->setUser($user);
        $event->setImg($data['img']);
        $event->setContent($data['content']);
        $event->setDate(new \DateTimeImmutable($data['date'])); // Assurez-vous que la date est au format correct

        // Enregistrer l'événement dans la base de données
        $entityManager->persist($event);
        $entityManager->flush();

        // Retourner une réponse JSON avec les informations de l'événement ajouté
        return new JsonResponse([
            'message' => 'Événement ajouté avec succès.',
            'event' => [
                'id' => $event->getId(),
                'nom' => $event->getNom(),
                'universite' => $event->getUniversite()->getNom(), // Assurez-vous que `getNom()` existe dans la classe `Universite`
                'user' => $event->getUser()->getNom(), // Assurez-vous que `getNom()` existe dans la classe `User`
                'img' => $event->getImg(),
                'content' => $event->getContent(),
                'date' => $event->getDate()->format('Y-m-d H:i:s'),
            ]
        ], JsonResponse::HTTP_CREATED);
    }
}
