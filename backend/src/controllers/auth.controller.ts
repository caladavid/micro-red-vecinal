import type { NextFunction, Request, Response } from 'express';
import User, { type IUser } from '../models/user.model.js'; 
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { customError } from '../utils/customError.js';
import { Types } from 'mongoose';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password, bio, avatarUrl, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(customError(400, 'El correo electrónico ya está registrado.'));
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      bio,
      avatarUrl,
      location,
      skills: [],
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id as Types.ObjectId, res);

    res.status(201).json({
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      bio: newUser.bio,
      avatarUrl: newUser.avatarUrl,
      location: newUser.location,
    });
  } catch (error) {
    console.error('Error in register controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as IUser | null;
    if (!user) return next(customError(400, 'Correo inválido.'));

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return next(customError(400, 'Contraseña inválida.'));

    const token = generateTokenAndSetCookie(user._id as Types.ObjectId, res);

    res.status(200).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      location: user.location,
      token,
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};