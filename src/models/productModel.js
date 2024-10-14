import mongoose from 'mongoose';
import { z } from 'zod';

const variantSchema = new mongoose.Schema({
    id: Number,
    name: String,
    options: [String],
});


const storeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    logo: String,
});


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    original_price: { type: Number },
    discount_percentage: { type: Number },
    currency: { type: String, default: 'USD' },
    in_stock: { type: Boolean, default: true },
    image_url: { type: String },
    variants: [variantSchema],
    store: storeSchema,
}, { timestamps: true });


const variantZodSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    options: z.array(z.string()).optional(),
});

const storeZodSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    logo: z.string().optional(),
});

const productZodSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().positive("Price must be a positive number"),
    original_price: z.number().optional(),
    discount_percentage: z.number().optional(),
    currency: z.string().default('USD'),
    in_stock: z.boolean().optional(),
    image_url: z.string().optional(),
    variants: z.array(variantZodSchema).optional(),
    store: storeZodSchema.optional(),
});

const Product = mongoose.model('Product', productSchema);


export { Product, productZodSchema };
