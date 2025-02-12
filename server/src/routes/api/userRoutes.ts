import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, registerUser, loginUser } from '../../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;