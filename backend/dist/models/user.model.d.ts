import mongoose, { Document, Types } from "mongoose";
export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    bio?: string;
    avatarUrl?: string;
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    skills: {
        name: string;
        level?: number;
        verified: boolean;
        endorsements: Types.ObjectId[];
    }[];
    createdAt: Date;
    updatedAt: Date;
    reputation?: number;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map