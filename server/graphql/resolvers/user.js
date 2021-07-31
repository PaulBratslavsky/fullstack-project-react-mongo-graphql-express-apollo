const { Post } = require("../../models/post");
const { Category } = require("../../models/category");

module.exports = {
  User: {
    
    posts: async (parent, arg, context, info) => {
      try {
        const userId = parent._id;
        const posts = await Post.find({ author: userId });
        return posts;
      } catch (error) {
        throw error;
      }
    },

    categories: async (parent, args, context, info) => {
      try {
        const userId = parent._id;
        const categories = await Category.find({ author: userId });
        return categories;
      } catch (error) {
        throw error;
      }
    },
  },
};
