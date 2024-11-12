"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOfDB = exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.commentSchema = new mongoose_1.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    postDate: { type: Date, required: true, default: Date.now },
    postId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Post' }
});
exports.commentOfDB = (0, mongoose_1.model)('Comment', exports.commentSchema);
