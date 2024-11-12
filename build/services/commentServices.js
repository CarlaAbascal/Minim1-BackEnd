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
exports.commentService = void 0;
const comment_1 = require("../models/comment");
const post_1 = require("../models/post");
exports.commentService = {
    // Crear nuevo comentario en un post
    addComment: (postId, commentData) => __awaiter(void 0, void 0, void 0, function* () {
        const newComment = yield comment_1.commentOfDB.create(commentData);
        yield post_1.postofDB.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        return newComment;
    }),
    // Obtener todos los comentarios de un post
    getCommentsByPostId: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield post_1.postofDB.findById(postId).populate('comments');
        return post ? post.comments : [];
    }),
    // Buscar comentario por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield comment_1.commentOfDB.findById(id);
    }),
    // Actualizar un comentario por ID
    updateComment: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield comment_1.commentOfDB.findByIdAndUpdate(id, body, { new: true });
    }),
    // Eliminar un comentario por ID
    deleteComment: (postId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
        yield comment_1.commentOfDB.findByIdAndDelete(commentId);
        yield post_1.postofDB.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
        return { message: "Comment deleted successfully" };
    })
};
