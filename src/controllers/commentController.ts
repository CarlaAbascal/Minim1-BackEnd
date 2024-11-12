import { Request, Response } from "express";
import { commentService } from "../services/commentServices"; // Asegúrate de importar correctamente
import { CommentInterface } from "../models/comment";
import { Types } from "mongoose";

// Obtener todos los comentarios de un post
export async function getComments(req: Request, res: Response): Promise<Response> {
    try {
        const { postId } = req.params;
        const comments = await commentService.getCommentsByPostId(postId);
        return res.json(comments);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get comments' });
    }
}

// Obtener comentario por ID
export async function getCommentById(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Get comment");
        const id = req.params.id; // Parámetro de ruta
        const comment = await commentService.findById(id);
        console.log("comment", comment);
        return res.json(comment);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get comment' });
    }
}

// Crear un nuevo comentario
export async function createComment(req: Request, res: Response): Promise<Response> {
    try {
        const { postId } = req.params; // Obtener postId de los parámetros de la ruta
        const { author, content } = req.body as CommentInterface;

        // Convertir postId a ObjectId
        const postObjectId = new Types.ObjectId(postId);
        // Crear un nuevo objeto de comentario
        const newComment: CommentInterface = {
            author,
            content,
            postDate: new Date(),
            postId: postObjectId
        };

        // Usar el servicio para crear el comentario
        const comment = await commentService.addComment(postId, newComment);

        return res.json({
            message: "Comment created",
            comment
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create comment' });
    }
}

// Actualizar comentario
export async function updateComment(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get comment');
        const id = req.params.id;
        const { author, content, postDate } = req.body as CommentInterface;
        const updatedComment: Partial<CommentInterface> = { author, content, postDate };
        const comment = await commentService.updateComment(id, updatedComment);

        if (!comment) {
            return res.status(404).json({ error: `Comment with id ${id} not found` });
        }
        return res.json({
            message: "Comment updated",
            comment
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update comment' });
    }
}

// Eliminar comentario
export async function deleteComment(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Delete comment');
        const { postId, commentId } = req.params;
        const result = await commentService.deleteComment(postId, commentId);

        if (!result) {
            return res.status(404).json({ error: `Comment with id ${commentId} not found` });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete comment' });
    }
}
