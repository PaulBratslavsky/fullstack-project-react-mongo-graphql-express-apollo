module.exports = {
  Query: {
    hello: async (parent, args, context, info) => {
      return "Hello World of GraphQl"
    }
  }
}