import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    bio?: string;
    avatarUrl?: string;
    location?: { type: "Point"; coordinates: [number, number] } | null;
    skills: {
        name: string;
        level?: number;
        verified: boolean;
        endorsements: Types.ObjectId[]
    }[];
    createdAt: Date;
    updatedAt: Date;
    reputation?: number;
}

const SkillSubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    endorsements: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const UserSchema = new Schema<IUser>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: { type: String },
    avatarUrl: { type: String },
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
    skills: [SkillSubSchema],
    reputation: { type: Number, default: 0 }
});

// create geospatial index for proximity queries
UserSchema.index({ location: '2dsphere' });


const User = mongoose.model<IUser>("User", UserSchema);

export default User;