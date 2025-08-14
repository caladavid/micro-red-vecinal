import { Router } from 'express';
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviews.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = Router();

// GET /api/reviews → obtener todas las reviews
router.get('/', getReviews);

// GET /api/reviews/:id → obtener una review por ID
router.get('/:id', getReviewById);

// POST /api/reviews → crear una review (requiere auth)
router.post('/', protectRoute, createReview);

// PUT /api/reviews/:id → actualizar una review (requiere auth)
router.put('/:id', protectRoute, updateReview);

// DELETE /api/reviews/:id → eliminar una review (requiere auth)
router.delete('/:id', protectRoute, deleteReview);

export default router;
