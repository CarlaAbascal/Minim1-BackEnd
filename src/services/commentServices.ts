import { commentOfDB } from '../models/comment';
import { postofDB } from '../models/post';

export const commentService = {
    // Crear nuevo comentario en un post
    addComment: async (postId: string, commentData: object) => {
        const newComment = await commentOfDB.create(commentData);
        await postofDB.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        return newComment;
    },
    // Obtener todos los comentarios de un post
    getCommentsByPostId: async (postId: string) => {
        const post = await postofDB.findById(postId).populate('comments');
        return post ? post.comments : [];
    },
    // Buscar comentario por ID
    findById: async (id: string) => {
        return await commentOfDB.findById(id);
    },
    // Actualizar un comentario por ID
    updateComment: async (id: string, body: object) => {
        console.log(body);
        return await commentOfDB.findByIdAndUpdate(id, body, { new: true });
    },
    // Eliminar un comentario por ID
    deleteComment: async (postId: string, commentId: string) => {
        await commentOfDB.findByIdAndDelete(commentId);
        await postofDB.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
        return { message: "Comment deleted successfully" };
    }
};
