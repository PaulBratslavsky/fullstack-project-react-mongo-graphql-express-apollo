const { User } = require("../../models/user");
const isAuthorized = require("../../utils/isAuthorized.js");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

module.exports = {
  Query: {
    user: async (parent, args, context, info) => {
      try {
        const req = isAuthorized(context.req);
        const user = await User.findOne({ _id: args.userId });

        if (req._id.toString() !== user._id.toString()) {
          throw new AuthenticationError("Something went wrong");
        }
        return user;
      } catch (error) {
        throw new ApolloError("Failed to find user");
      }
    },

    isAuth: async (parent, args, context, info) => {
      try {
        const req = isAuthorized(context.req, true);

        if (!req._id) {
          throw new AuthenticationError("Bad token");
        }

        return {
          _id: req._id,
          email: req.email,
          token: req.token,
        };
      } catch (error) {}
    },
  },
};
