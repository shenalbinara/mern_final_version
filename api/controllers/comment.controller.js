import Comment from "../models/comment.models.js";


export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        // Basic check for user presence
        if (!userId) {
            return res.status(403).json({ message: 'User is not logged in or userId is missing' });
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();
        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
};

export const getPostComments = async (req, res, next) => {
    try {
         const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,

        });
        res.status(200).json(comments);

    } catch (error) {
        next(error);

    }
};



export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userIndex = comment.likes.indexOf(userId);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

/*

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const userId = req.body.userId;
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};     */


export const getcomments = async (req, res, next) => {
  const userId = req.headers['user-id']; // Get user ID from headers
  const adminId = '68232b44ac8e2ae7222d548a';

  if (userId !== adminId) {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: 'You are not allowed to get all comments',
    });
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};



// comment.controller.js
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const adminId = '68232b44ac8e2ae7222d548a';

  try {
    if (req.headers['user-id'] !== adminId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const deleted = await Comment.findByIdAndDelete(commentId);
    if (!deleted) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

