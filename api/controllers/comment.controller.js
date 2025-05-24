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



