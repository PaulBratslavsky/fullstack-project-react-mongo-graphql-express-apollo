const { User } = require("../../models/user");
const { Category } = require("../../models/category");

module.exports = {
  Post: {
    author: async (parent, arg, context, info) => {
      try {
        const userId = parent.author;
        const user = await User.findOne({ _id: userId });

        return {
          ...user._doc,
          password: null,
        };
      } catch (error) {
        throw error;
      }
    },
  },

  category: async (parent, arg, context, info) => {
    try {
      const categoryID = parent.category;
      const category = await Category.findById({ _id: categoryID });

      return { ...category._doc }
      
    } catch (error) {
      throw error;
    }
  },
};
