import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a user by id
router.get('/:id', getUserById);

// CREATE a new user
router.post('/', createUser);

// UPDATE a user by id
router.put('/:id', updateUser);

// DELETE a user by id
router.delete('/:id', deleteUser);

export { router as userRoutes };