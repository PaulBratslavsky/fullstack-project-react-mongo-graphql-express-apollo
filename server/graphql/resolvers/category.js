const { User } = require("../../models/user");
const { Post } = require("../../models/post");

module.exports = {
  Category: {
    posts: async (parent, arg, context, info) => {
      try {
        const categoryID = parent._id;
        const posts = await Post.find({ category: categoryID })

        return posts;
      } catch (error) {
        throw error;
      }
    },

    author: async (parent, arg, context, info) => {
      try {
        const authorID = parent.author;
        const user = await User.findOne({ _id: authorID })

        return {
          ...user._doc,
          password: null,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
