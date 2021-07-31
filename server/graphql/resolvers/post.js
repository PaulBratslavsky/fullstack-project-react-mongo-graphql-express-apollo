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
    // TODO: FIGURE OUT WHAT IS GOING ON HERE
    category: async (parent, args, context, info) => {
      try {
        const categoryId = parent.category;
        console.log(categoryId, "cat id")
        const category = await Category.findById({ _id: categoryId });
        console.log(...category._doc, "4444444")
        return {
          ...category._doc,
        };
      } catch (error) {
        console.log(error)

        throw error;
      }
    },
  },
};
