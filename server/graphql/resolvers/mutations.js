const { User } = require('../../models/user')
const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server-express')

module.exports = {
  Mutation: {

    signUp: async (parent, args, context, info) => {
      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password
        })
        
        const token = await user.generateToken()
        if(!token) throw new AuthenticationError('Server Error')
        return { ...token._doc }
      } catch (error) {
        if (error.code === 11000) {
          throw new AuthenticationError('Duplicate Entry')
        }
        throw error
      } 
    },

    signIn: async (parent, args, context, info) => {
      return true
    }

  }
}