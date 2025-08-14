import mongoose, { Schema } from "mongoose";
const ReviewSchema = new Schema({
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
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
//# sourceMappingURL=review.model.js.map