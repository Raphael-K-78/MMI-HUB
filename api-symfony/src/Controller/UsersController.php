<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class UsersController extends AbstractController
{
    // Route pour récupérer tous les utilisateurs avec tri
    #[Route('/api/user', name: 'api_users', methods: ['GET'])]
    public function getAllUsers(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les paramètres de tri (par défaut tri par 'nom' et ordre 'asc')
        $sort = $request->query->get('sort', 'nom');  // Champ de tri, par défaut 'nom'
        $order = $request->query->get('order', 'asc');  // Ordre de tri, par défaut 'asc'

        // Validation de l'ordre (asc ou desc)
        if (!in_array(strtolower($order), ['asc', 'desc'])) {
            $order = 'asc';  // Si l'ordre n'est pas valide, on remet à 'asc'
        }

        // Création du QueryBuilder pour récupérer les utilisateurs
        $queryBuilder = $entityManager->getRepository(User::class)->createQueryBuilder('u');

        // Application du tri
        $queryBuilder->orderBy('u.' . $sort, $order);

        // Exécuter la requête
        $users = $queryBuilder->getQuery()->getResult();

        // Construire un tableau avec les données des utilisateurs
        $usersData = [];
        foreach ($users as $user) {
            $usersData[] = [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'email' => $user->getMail(),
            ];
        }

        // Retourner la réponse JSON avec les données des utilisateurs
        return new JsonResponse($usersData);
    }
}
