import type { Request, Response } from 'express';
import Review from '../models/review.model.js';

// Obtener todas las reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ message: 'Reviews obtenidas exitosamente', reviews });
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    res.status(500).json({ error: 'Error al obtener reviews' });
  }
};

// Obtener review por ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review no encontrada' });

    res.status(200).json({ message: 'Review obtenida exitosamente', review });
  } catch (error) {
    console.error('Error al obtener review:', error);
    res.status(500).json({ error: 'Error al obtener review' });
  }
};

// Crear review
export const createReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { reviewee, post, rating, comment } = req.body;

    const newReview = new Review({
      reviewer: req.user._id, // Se asigna automáticamente el usuario autenticado
      reviewee,
      post,
      rating,
      comment
    });

    await newReview.save();

    res.status(201).json({
      message: 'Review creada exitosamente',
      review: newReview
    });
  } catch (error) {
    console.error('Error al crear review:', error);
    res.status(500).json({ error: 'Error al crear review' });
  }
};

// Actualizar review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review no encontrada' });

    if (review.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
    res.status(200).json({ message: 'Review actualizada exitosamente', review: updatedReview });
  } catch (error) {
    console.error('Error al actualizar review:', error);
    res.status(500).json({ error: 'Error al actualizar review' });
  }
};

// Eliminar review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review no encontrada' });

    if (review.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review eliminada exitosamente', review });
  } catch (error) {
    console.error('Error al eliminar review:', error);
    res.status(500).json({ error: 'Error al eliminar review' });
  }
};

export const getReviewsForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const reviews = await Review.find({ reviewee: userId })
      .populate("reviewer", "name email") // opcional
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      message: "Reviews obtenidas exitosamente", 
      reviews 
    });
  } catch (error) {
    console.error("Error al obtener reviews del usuario:", error);
    res.status(500).json({ error: "Error al obtener reviews del usuario" });
  }
};
