import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";
import Post from '../models/post.model.js';
import { now } from 'mongoose';

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



export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts= await Post.find({ 
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && { 
                 $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i'} },

                 ],
            }),
        })
           .sort({ updatedAt: sortDirection })
           .skip(startIndex)
           .limit(limit);

           const totalPosts =  await Post.countDocuments();

          const now = new Date();

const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
);

const lastMonthPosts = await Post.countDocuments({
    createdAt: { $gte: oneMonthAgo },
});

           res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
           })

    } catch (error) {
        next(error);

    }
}

//begining of delete 
export const deletepost = async (req, res, next) => {
  const { postId, userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

//beginign of the update post section

