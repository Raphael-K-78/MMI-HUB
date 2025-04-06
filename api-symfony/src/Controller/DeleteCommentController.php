<?php
// src/Controller/CommentController.php

namespace App\Controller;

use App\Entity\Commentaire;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteCommentController extends AbstractController
{
    // Route pour supprimer un commentaire avec l'URL /api/delete/comment/{id}
    #[Route('/api/delete/comment/{id}', name: 'api_delete_comment', methods: ['DELETE'])]
    public function deleteComment(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Trouver le commentaire par son ID
        $commentaire = $entityManager->getRepository(Commentaire::class)->find($id);

        // Si le commentaire n'existe pas, renvoyer une erreur 404
        if (!$commentaire) {
            throw new NotFoundHttpException('Commentaire non trouvé');
        }

        // Supprimer le commentaire
        $entityManager->remove($commentaire);
        $entityManager->flush();

        // Retourner une réponse JSON de succès
        return new JsonResponse(['message' => 'Commentaire supprimé avec succès'], 200);
    }
}
