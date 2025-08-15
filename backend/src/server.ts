import express from 'express';
import dotenv from "dotenv";

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from "path"
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url"; // Importa fileURLToPath

import connectToMongoDB from './db/connectToMongoDB.js';

import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import reviewRoutes from './routes/review.routes.js'


dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()
const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(__dirname, '..')


app.use(helmet());
app.use(cors({
  origin: 'http://localhost:4200', // <-- URL exacta de tu frontend
  credentials: true,               // <-- permite cookies
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);

console.log(`__dirname (ruta actual del script): ${__dirname}`);
console.log(`projectRoot (raíz del proyecto): ${projectRoot}`);

const angularDist = path.join(__dirname, 'frontend', 'dist', 'micro-red-vecinal', "browser");
console.log(`Ruta de los archivos estáticos del frontend: ${angularDist}`);
app.use(express.static(angularDist));

// fallback para todas las rutas que no sean API
app.all('/{*any}', (req, res) => {
  if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(angularDist, 'index.html'));
    }
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
}); 