import type { NextFunction, Request, Response } from 'express';
import User from '../models/user.model.js';
import { customError } from '../utils/customError.js';
import mongoose from 'mongoose';
import Review from '../models/review.model.js';

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Consulta para obtener todos los usuarios
    const users = await User.find().select('-password');

    // Devuelve los usuarios en la respuesta
    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      users,
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new Error('Usuario no autenticado.'));
    }

    // Consulta para obtener todos los usuarios
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    
    /* const user = await User.findById(userId).select('username email role newsWantedWords'); */

    if (!user) {
      return next(customError(404, 'Usuario no encontrado.'));
    }

    // Devuelve los usuarios en la respuesta
    res.status(200).json({
      message: 'Usuario obtenidos exitosamente',
      user: req.user,
    });

  } catch (error) {
    console.error('Error al obtener usuario autenticado:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    // Completar
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID de usuario inválido.' });
    }

    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
   
    res.status(200).json({ message: 'Usuario obtenido exitosamente', user });
  } catch (error) {
    console.error('Error al obtener al usuario:', error);
    res.status(500).json({ error: 'Error al obtener al usuario' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    
    const user = await User.create(req.body);
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user,
    });

  } catch (error) {
    console.error('Error al crear al usuario:', error);
    res.status(500).json({ error: 'Error al crear al usuario' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; 
    const updateData = req.body; 
    console.log({updateData})
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, 
      runValidators: true, 
    }).select('-password'); 
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Usuario actualizado exitosamente',
      user: updatedUser,
    });
   
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};



export const deleteUser = async (req: Request, res: Response) => {
  try {
    //indentificar el ID
    const userId = req.params.id;
    //buscar y eliminar id de usuario
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    //Respuesta correcta
    res.status(200).json({
      message: 'Usuario eliminado exitosamente',
      user: deletedUser,
    });

  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export const getReviewsForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    console.log("Buscando reviews para usuario:", userId);

    const reviews = await Review.find({ reviewee: userId }).populate('reviewer', 'first_name last_name').sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Reviews obtenidas exitosamente',
      reviews
    });
  } catch (error: any) {
    console.error("Error en getReviewsForUser:", error.message);
    res.status(500).json({ error: 'Error al obtener reviews del usuario', detail: error.message });
  }
};

export const createReviewForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID de usuario inválido.' });
    }

    if (!req.user?._id) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    const { rating, comment, post } = req.body;

    const newReview = await Review.create({
      reviewer: req.user._id,
      reviewee: userId,
      rating,
      comment,
      post
    });

    res.status(201).json({
      message: 'Review creada exitosamente',
      review: newReview
    });

  } catch (error: any) {
    console.error('Error creando review para usuario:', error.message, error.stack);
    res.status(500).json({ error: 'Error al crear review', detail: error.message });
  }
};