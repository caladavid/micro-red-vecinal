import express from "express";
import { createUser, deleteUser, getAuthenticatedUser, getUserById, getUsers, updateUser, getReviewsForUser, createReviewForUser } from "../controllers/users.controller.js";
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

router.get('/:id/reviews', getReviewsForUser);

router.post('/:id/reviews', protectRoute, createReviewForUser);


export default router;