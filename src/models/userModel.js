

import mongoose from 'mongoose';
import { z } from 'zod';

export const userZodSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .max(30, "Username must be at most 30 characters long"),
    display_name: z.string()
        .min(1, "Display name is required"),
    profile_picture: z.string().optional(),
    bio: z.string().optional(),
    followers_count: z.number()
        .default(0)
        .nonnegative("Followers count cannot be negative"),
    verified: z.boolean()
        .default(false),
});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true 
    },
    display_name: {
        type: String,
        required: true,
        index: true 
    },
    profile_picture: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    followers_count: {
        type: Number,
        default: 0,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
