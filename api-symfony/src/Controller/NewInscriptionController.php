<?php

namespace App\Controller;

use App\Entity\Inscription;
use App\Entity\User;
use App\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NewInscriptionController extends AbstractController
{
    #[Route('/api/add/inscription', name: 'api_add_inscription', methods: ['POST'])]
    public function addInscription(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si toutes les données nécessaires sont présentes
        if (empty($data['id_user']) || empty($data['id_event'])) {
            throw new BadRequestHttpException('Données manquantes pour ajouter une inscription.');
        }

        // Récupérer l'utilisateur et l'événement en fonction des identifiants fournis
        $user = $entityManager->getRepository(User::class)->find($data['id_user']);
        $event = $entityManager->getRepository(Event::class)->find($data['id_event']);

        if (!$user) {
            throw new BadRequestHttpException('L\'utilisateur spécifié n\'existe pas.');
        }

        if (!$event) {
            throw new BadRequestHttpException('L\'événement spécifié n\'existe pas.');
        }

        // Vérifier si l'utilisateur est déjà inscrit à cet événement
        $existingInscription = $entityManager->getRepository(Inscription::class)
                                             ->findOneBy(['user' => $user, 'event' => $event]);

        if ($existingInscription) {
            throw new BadRequestHttpException('L\'utilisateur est déjà inscrit à cet événement.');
        }

        // Créer une nouvelle inscription
        $inscription = new Inscription();
        $inscription->setUser($user);
        $inscription->setEvent($event);

        // Enregistrer l'inscription dans la base de données
        $entityManager->persist($inscription);
        $entityManager->flush();

        // Retourner une réponse JSON avec les informations de l'inscription ajoutée
        return new JsonResponse([
            'message' => 'Inscription ajoutée avec succès.',
            'inscription' => [
                'id' => $inscription->getIdInscription(),
                'user' => $inscription->getUser()->getNom(), // Assurez-vous que `getNom()` existe dans la classe `User`
                'event' => $inscription->getEvent()->getNom(), // Assurez-vous que `getNom()` existe dans la classe `Event`
            ]
        ], JsonResponse::HTTP_CREATED);
    }
}
