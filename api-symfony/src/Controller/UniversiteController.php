<?php
// src/Controller/UniversiteController.php

namespace App\Controller;

use App\Entity\Universite;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class UniversiteController extends AbstractController
{
    // Route pour récupérer toutes les universités avec tri
    #[Route('/api/universites', name: 'api_universites', methods: ['GET'])]
    public function getAllUniversites(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer les paramètres de tri (par défaut tri par 'nom' et ordre 'asc')
        $sort = $request->query->get('sort', 'nom');  // Champ de tri, par défaut 'nom'
        $order = $request->query->get('order', 'asc');  // Ordre de tri, par défaut 'asc'

        // Validation de l'ordre (asc ou desc)
        if (!in_array(strtolower($order), ['asc', 'desc'])) {
            $order = 'asc';  // Si l'ordre n'est pas valide, on remet à 'asc'
        }

        // Création du QueryBuilder pour récupérer les universités
        $queryBuilder = $entityManager->getRepository(Universite::class)->createQueryBuilder('u');

        // Application du tri
        $queryBuilder->orderBy('u.' . $sort, $order);

        // Exécuter la requête
        $universites = $queryBuilder->getQuery()->getResult();

        // Construire un tableau avec les données des universités
        $universitesData = [];
        foreach ($universites as $universite) {
            $universitesData[] = [
                'id' => $universite->getId(),
                'nom' => $universite->getNom(),
                'ville' => $universite->getVille(),
            ];
        }

        // Retourner la réponse JSON avec les données des universités
        return new JsonResponse($universitesData);
    }
}
