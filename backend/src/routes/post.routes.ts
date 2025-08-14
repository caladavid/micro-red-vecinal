import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = Router();

// GET /api/posts → obtener todos los posts
router.get('/', getPosts);

// GET /api/posts/:id → obtener un post por ID
router.get('/:id', getPostById);

// POST /api/posts → crear un post (requiere auth)
router.post('/', protectRoute, createPost);

// PUT /api/posts/:id → actualizar un post (requiere auth)
router.put('/:id', protectRoute, updatePost);

// DELETE /api/posts/:id → eliminar un post (requiere auth)
router.delete('/:id', protectRoute, deletePost);

export default router;
