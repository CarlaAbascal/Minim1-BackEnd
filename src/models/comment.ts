import { model, Schema, Types } from "mongoose";

export interface CommentInterface {
    author: string;
    content: string;
    postDate?: Date; 
    postId: Types.ObjectId;
}

export const commentSchema = new Schema<CommentInterface>({
    author: { type: String, required: true },
    content: { type: String, required: true },
    postDate: { type: Date, required: true, default: Date.now },
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' } 
});

export const commentOfDB = model<CommentInterface>('Comment', commentSchema);
