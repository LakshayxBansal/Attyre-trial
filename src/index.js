
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import dotenv from 'dotenv';
import { errorHandler } from './utils/errorHandler.js';  
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/videos', videoRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
