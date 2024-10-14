import Video, { videoValidationSchema } from '../models/videoModel.js';
import { redisClient } from '../config/redis.js';

export const getAllVideos = async (req, res) => {
  try {
    const cacheKey = 'all_videos';
    const cachedVideos = await redisClient.get(cacheKey);

    if (cachedVideos) {
      return res.status(200).json(JSON.parse(cachedVideos));
    }

    const videos = await Video.find();
    await redisClient.set(cacheKey, JSON.stringify(videos), {
      EX: 3600,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `video_${id}`;
    const cachedVideo = await redisClient.get(cacheKey);

    if (cachedVideo) {
      return res.status(200).json(JSON.parse(cachedVideo));
    }

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await redisClient.set(cacheKey, JSON.stringify(video), {
      EX: 3600,
    });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error });
  }
};

export const createVideo = async (req, res) => {
  try {
    const parsedData = videoValidationSchema.parse(req.body);
    const video = new Video(parsedData);
    await video.save();
    
    await redisClient.del('all_videos');
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.errors || error });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedData = videoValidationSchema.parse(req.body);
    const video = await Video.findByIdAndUpdate(id, parsedData, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await redisClient.del('all_videos');
    await redisClient.del(`video_${id}`);

    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.errors || error });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await redisClient.del('all_videos');
    await redisClient.del(`video_${id}`);

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
};
