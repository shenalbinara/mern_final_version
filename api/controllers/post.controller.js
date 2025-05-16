import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";
import Post from '../models/post.model.js';

export const create = async (req, res, next) => {
    // Validate required fields
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Check if email is allowed
        const allowedEmails = [
            "charuhettiarachchi929@gmail.com",
            "kahadhugodakankanamge@gmail.com"
        ];
        if (!allowedEmails.includes(user.email)) {
            return next(errorHandler(403, 'Only specific users can create posts'));
        }

        // Generate slug from title
        const slug = title
            .split(' ')
            .join('_')
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '_');

        // Create post
        const newPost = new Post({
            ...req.body,
            slug,
            userId: user._id
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};
