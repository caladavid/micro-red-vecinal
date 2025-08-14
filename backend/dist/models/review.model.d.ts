import mongoose, { Document, Schema } from "mongoose";
export interface IReview extends Document {
    reviewer: Schema.Types.ObjectId;
    reviewee: Schema.Types.ObjectId;
    post?: Schema.Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
}
declare const Review: mongoose.Model<IReview, {}, {}, {}, mongoose.Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Review;
