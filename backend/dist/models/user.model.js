import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt';
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
});
const UserSchema = new Schema({
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
// Middleware para hashear la contraseña antes de guardar el usuario
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Si la contraseña no ha cambiado, no la rehasheamos
    }
    try {
        const salt = await bcrypt.genSalt(10); // Genera el "salt"
        this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            next(error); // Si el error es una instancia de Error, lo pasamos al siguiente middleware
        }
        else {
            // Si no es un Error, lanzamos un error genérico
            next(new Error('An unknown error occurred while hashing the password'));
        }
    }
});
// Método para comparar contraseñas durante el login
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password || '');
};
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map