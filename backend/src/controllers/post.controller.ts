import type { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model.js';
import { customError } from '../utils/customError.js';

// Obtener todos los posts
export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: 'Posts obtenidos exitosamente', posts });
    } catch (error) {
        console.error('Error al obtener posts:', error);
        res.status(500).json({ error: 'Error al obtener posts' });
    }
};

// Obtener post por ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });

        res.status(200).json({ message: 'Post obtenido exitosamente', post });
    } catch (error) {
        console.error('Error al obtener post:', error);
        res.status(500).json({ error: 'Error al obtener post' });
    }
};

// Crear post (usuario autenticado)
export const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { type, title, description, category, tags, location, status } = req.body;

    const newPost = new Post({
      user: req.user._id, // Se asigna automáticamente el usuario autenticado
      type,
      title,
      description,
      category,
      tags,
      location,
      status
    });

    await newPost.save();

    res.status(201).json({
      message: 'Post creado exitosamente',
      post: newPost
    });
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ error: 'Error al crear post' });
  }
};

// Actualizar post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });

        // Solo el dueño puede actualizar
        if (post.user.toString() !== req.user?._id.toString()) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
        res.status(200).json({ message: 'Post actualizado exitosamente', post: updatedPost });
    } catch (error) {
        console.error('Error al actualizar post:', error);
        res.status(500).json({ error: 'Error al actualizar post' });
    }
};

// Eliminar post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });

        if (post.user.toString() !== req.user?._id.toString()) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post eliminado exitosamente', post });
    } catch (error) {
        console.error('Error al eliminar post:', error);
        res.status(500).json({ error: 'Error al eliminar post' });
    }
};
