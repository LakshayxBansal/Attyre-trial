
import User from '../models/userModel.js';
import { redisClient } from '../config/redis.js';


export const getAllUsers = async (req, res) => {
  try {
    const cacheKey = 'all_users';
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).json(JSON.parse(cachedUsers));
    }

    const users = await User.find();
    await redisClient.set(cacheKey, JSON.stringify(users), {
      EX: 3600,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `user_${id}`;
    const cachedUser = await redisClient.get(cacheKey);

    if (cachedUser) {
      return res.status(200).json(JSON.parse(cachedUser));
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await redisClient.set(cacheKey, JSON.stringify(user), {
      EX: 3600,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};


export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    await redisClient.del('all_users');
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    await redisClient.del('all_users');
    await redisClient.del(`user_${id}`);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

  
    await redisClient.del('all_users');
    await redisClient.del(`user_${id}`);

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
