import express from 'express';
import { getComments, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentController';

const commentRoutes = express.Router();

// Ruta para obtener todos los comentarios
commentRoutes.get('/post/:postId', getComments);

// Ruta para obtener un comentario por ID
commentRoutes.get('/:id', getCommentById);

// Ruta para crear un nuevo comentario
commentRoutes.post('/:postId', createComment);

// Ruta para actualizar un comentario por ID
commentRoutes.put('/:id', updateComment);

// Ruta para eliminar un comentario por ID
commentRoutes.delete('/:postID/:commentId', deleteComment);

export default commentRoutes;
