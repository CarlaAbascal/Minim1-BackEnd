import { model, Schema,Types } from "mongoose";


export interface postInterface{
    author: string,
    postType: string,
    content: string,
    image?: string,
    postDate: Date,
    comments?: Types.ObjectId[] //Comentaris
}

export type newPostInfo = Omit<postInterface,'id'>

export const postSchema = new Schema<postInterface>({
    author: { type: String, required: true },
    postType: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    postDate: { type: Date, required: false },
    comments: [{type: Types.ObjectId,ref: 'Comment'}] //Comentaris
})

export const postofDB = model<postInterface>('post',postSchema)