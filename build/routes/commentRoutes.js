"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const commentRoutes = express_1.default.Router();
// Ruta para obtener todos los comentarios
commentRoutes.get('/post/:postId', commentController_1.getComments);
// Ruta para obtener un comentario por ID
commentRoutes.get('/:id', commentController_1.getCommentById);
// Ruta para crear un nuevo comentario
commentRoutes.post('/:postId', commentController_1.createComment);
// Ruta para actualizar un comentario por ID
commentRoutes.put('/:id', commentController_1.updateComment);
// Ruta para eliminar un comentario por ID
commentRoutes.delete('/:postID/:commentId', commentController_1.deleteComment);
exports.default = commentRoutes;
