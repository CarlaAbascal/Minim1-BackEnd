"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = getComments;
exports.getCommentById = getCommentById;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
const commentServices_1 = require("../services/commentServices"); // Asegúrate de importar correctamente
const mongoose_1 = require("mongoose");
// Obtener todos los comentarios de un post
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { postId } = req.params;
            const comments = yield commentServices_1.commentService.getCommentsByPostId(postId);
            return res.json(comments);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get comments' });
        }
    });
}
// Obtener comentario por ID
function getCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get comment");
            const id = req.params.id; // Parámetro de ruta
            const comment = yield commentServices_1.commentService.findById(id);
            console.log("comment", comment);
            return res.json(comment);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get comment' });
        }
    });
}
// Crear un nuevo comentario
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { postId } = req.params; // Obtener postId de los parámetros de la ruta
            const { author, content } = req.body;
            // Convertir postId a ObjectId
            const postObjectId = new mongoose_1.Types.ObjectId(postId);
            // Crear un nuevo objeto de comentario
            const newComment = {
                author,
                content,
                postDate: new Date(),
                postId: postObjectId
            };
            // Usar el servicio para crear el comentario
            const comment = yield commentServices_1.commentService.addComment(postId, newComment);
            return res.json({
                message: "Comment created",
                comment
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create comment' });
        }
    });
}
// Actualizar comentario
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get comment');
            const id = req.params.id;
            const { author, content, postDate } = req.body;
            const updatedComment = { author, content, postDate };
            const comment = yield commentServices_1.commentService.updateComment(id, updatedComment);
            if (!comment) {
                return res.status(404).json({ error: `Comment with id ${id} not found` });
            }
            return res.json({
                message: "Comment updated",
                comment
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update comment' });
        }
    });
}
// Eliminar comentario
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete comment');
            const { postId, commentId } = req.params;
            const result = yield commentServices_1.commentService.deleteComment(postId, commentId);
            if (!result) {
                return res.status(404).json({ error: `Comment with id ${commentId} not found` });
            }
            return res.json(result);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to delete comment' });
        }
    });
}
