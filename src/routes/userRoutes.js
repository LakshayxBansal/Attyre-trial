
import express from 'express';
import { z } from 'zod';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const userZodSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .max(30, "Username must be at most 30 characters long"),
    display_name: z.string()
        .min(1, "Display name is required"),
    profile_picture: z.string().optional(), 
    bio: z.string().optional(),
    followers_count: z.number()
        .default(0),
    verified: z.boolean()
        .default(false),
});

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const validatedData = userZodSchema.parse(req.body);
        await createUser(req, res, validatedData); 
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
