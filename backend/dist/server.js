import express from 'express';
import dotenv from "dotenv";
/* import userRoutes from './routes/users.routes' */
/* import connectToMongoDB from './db/connectToMongoDB.js'; */
console.log("Compilación OK");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
/* app.use("/api/users", userRoutes) */
app.listen(PORT, () => {
    /* connectToMongoDB(); */
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map