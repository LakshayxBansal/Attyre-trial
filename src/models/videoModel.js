import mongoose from 'mongoose';
import { z } from 'zod';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    original_price: { type: Number, required: true },
    discount_percentage: { type: Number, required: true },
    currency: { type: String, required: true },
    in_stock: { type: Boolean, required: true }
});

const musicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true }
});

const videoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    view_count: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    products: [productSchema],
    music: musicSchema
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

const productZodSchema = z.object({
    name: z.string().nonempty(),
    price: z.number().positive(),
    original_price: z.number().positive(),
    discount_percentage: z.number().nonnegative(),
    currency: z.string().nonempty(),
    in_stock: z.boolean()
});

const musicZodSchema = z.object({
    name: z.string().nonempty(),
    artist: z.string().nonempty()
});

export const videoValidationSchema = z.object({
    description: z.string().nonempty(),
    view_count: z.number().nonnegative().optional(),
    duration: z.number().positive(),
    products: z.array(productZodSchema).optional(),
    music: musicZodSchema
});

export default Video;
