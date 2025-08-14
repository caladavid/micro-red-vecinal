import mongoose, { Document, Schema } from "mongoose";
export interface IPost extends Document {
    user: Schema.Types.ObjectId;
    type: 'offer' | 'request';
    title: string;
    description: string;
    category?: string;
    tags: string[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    status: 'open' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}
declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost, {}, {}> & IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Post;
