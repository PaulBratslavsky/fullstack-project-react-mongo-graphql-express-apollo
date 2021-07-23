const { User } = require("../../models/user");
const { AuthenticationError } = require("apollo-server-express");
const isAuthorized = require("../../utils/isAuthorized");
const isOwner = require("../../utils/isOwner");
module.exports = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password,
        });

        const token = await user.generateToken();
        if (!token) throw new AuthenticationError("Server Error");
        return { ...token._doc };
      } catch (error) {
        if (error.code === 11000) {
          throw new AuthenticationError("Duplicate Entry");
        }
        throw error;
      }
    },

    signIn: async (parent, args, context, info) => {
      // 1. get user
      const user = await User.findOne({ email: args.fields.email });

      if (!user) {
        throw new AuthenticationError("Please provide valid user email");
      }

      // 2. check password
      const password = await user.checkPassword(args.fields.password);

      if (!password) {
        throw new AuthenticationError("Please provide valid password");
      }

      // 3. generate token
      const token = await user.generateToken();

      if (!token) {
        throw new AuthenticationError("Server Error");
      }

      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: user.token,
      };
    },

    updateUserProfile: async (parent, args, context, info) => {
      try {
        const req = isAuthorized(context.req);

        if (!isOwner(req, args.userId)) {
          throw new AuthenticationError("Not authorized");
        }

        /* TODO: add backend validation when getting data from the front end */

        const user = await User.findOneAndUpdate(
          { _id: args.userId },
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
            },
          },
          {
            new: true,
          }
        );

        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};
