import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

interface JwtPayloadWithUserId extends JwtPayload {
	userId: Types.ObjectId;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // Preferimos header Authorization: Bearer <token>
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Si no hay header, intentamos desde cookie
    else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(customError(401, "Unauthorized - No token provided."));
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayloadWithUserId;

    if (!decoded?.userId) {
      return next(customError(401, "Unauthorized - Invalid token."));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(customError(401, "Usuario no encontrado."));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return next(customError(500, "Internal Server Error"));
  }
};