import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['offer', 'request'],
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    tags: [{
            type: String
        }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        } // [lng, lat]
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
}, { timestamps: true });
PostSchema.index({ location: '2dsphere' });
const Post = mongoose.model("Post", PostSchema);
export default Post;
//# sourceMappingURL=post.model.js.map