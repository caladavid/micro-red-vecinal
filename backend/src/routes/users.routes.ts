import express from "express";
import { createUser, deleteUser, getAuthenticatedUser, getUserById, getUsers, updateUser } from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/', getUsers);
/* router.get('/', protectRoute, getUsers); */

router.get('/me', protectRoute, getAuthenticatedUser);

router.get('/:id', getUserById);

router.post('/', createUser);
/* router.post('/', protectRoute, createUser); */

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;