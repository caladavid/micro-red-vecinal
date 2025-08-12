import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReview extends Document {
    reviewer: Schema.Types.ObjectId;
    reviewee: Schema.Types.ObjectId;
    post?: Schema.Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String
    }
}, { timestamps: true });

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;