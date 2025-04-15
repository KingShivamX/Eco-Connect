const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Support pagination and filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');
    
    const total = await Post.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name avatar bio')
      .populate('comments.user', 'name avatar');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error fetching post' });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;
    
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      category,
      image,
      tags: tags && tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    const post = await newPost.save();
    
    // Populate author info before sending response
    await post.populate('author', 'name avatar');
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error creating post' });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;
    
    // Find post and check ownership
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author or an admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        image,
        tags: tags && tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : post.tags
      },
      { new: true }
    ).populate('author', 'name avatar');
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error updating post' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author or an admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error deleting post' });
  }
};

// Like/unlike post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if post has already been liked by user
    const alreadyLiked = post.likes.includes(req.user.id);
    
    if (alreadyLiked) {
      // Unlike post
      post.likes = post.likes.filter(
        like => like.toString() !== req.user.id
      );
    } else {
      // Like post
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json({ likes: post.likes, likeCount: post.likes.length });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error toggling like' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Add comment
    post.comments.unshift({
      user: req.user.id,
      text
    });
    
    await post.save();
    
    // Populate user info for new comment before sending response
    await post.populate('comments.user', 'name avatar');
    
    res.json(post.comments);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Find comment
    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.commentId
    );
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is comment owner or admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    // Remove comment
    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );
    
    await post.save();
    
    res.json(post.comments);
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error deleting comment' });
  }
};
