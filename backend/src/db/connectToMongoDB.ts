import mongoose from "mongoose";

const connectToMongoDB = async () => {
    const mongoUrl = process.env.MONGO_DB_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_DB_URL no está definido en las variables de entorno");
    }
    try {
        await mongoose.connect(mongoUrl)
        console.log("Connected to MongoDB")
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting to MongoDB:", error.message);
        } else {
            console.log("Error desconocido al conectar a MongoDB:", error);
        }
    }
};

export default connectToMongoDB;