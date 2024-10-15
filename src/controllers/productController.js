// src/controllers/productController.js
import { Product, productZodSchema } from '../models/productModel.js'; // Correctly importing
import { redisClient } from '../config/redis.js';

export const getAllProducts = async (req, res) => {
    try {
        const cacheKey = 'all_products';
        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
            return res.status(200).json(JSON.parse(cachedProducts));
        }

        const products = await Product.find();
        await redisClient.set(cacheKey, JSON.stringify(products), {
            EX: 3600,
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `product_${id}`;
        const cachedProduct = await redisClient.get(cacheKey);

        if (cachedProduct) {
            return res.status(200).json(JSON.parse(cachedProduct));
        }

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await redisClient.set(cacheKey, JSON.stringify(product), {
            EX: 3600,
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

export const createProduct = async (req, res) => {
    try {
        const validationResult = productZodSchema.safeParse(req.body); // Use productZodSchema for validation
        if (!validationResult.success) {
            return res.status(400).json({ message: 'Validation error', errors: validationResult.error.errors });
        }

        const product = new Product(req.body);
        await product.save();
        
        await redisClient.del('all_products');
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const validationResult = productZodSchema.safeParse(req.body); // Use productZodSchema for validation
        if (!validationResult.success) {
            return res.status(400).json({ message: 'Validation error', errors: validationResult.error.errors });
        }

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await redisClient.del('all_products');
        await redisClient.del(`product_${id}`);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await redisClient.del('all_products');
        await redisClient.del(`product_${id}`);

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
