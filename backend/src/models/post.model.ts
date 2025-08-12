import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPost extends Document {
    user: Schema.Types.ObjectId;
    type: 'offer' | 'request';
    title: string;
    description: string;
    category?: string;
    tags: string[];
    location?: { type: "Point"; coordinates: [number, number] } | null;
    status: 'open' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
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

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;