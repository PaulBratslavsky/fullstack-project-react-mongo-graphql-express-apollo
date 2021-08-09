const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongose =  require('mongoose');
const typeDefs = require('./graphql/schema');
const { Query } = require('./graphql/resolvers/queries');
const { Mutation } = require('./graphql/resolvers/mutations');
const { User } = require('./graphql/resolvers/user');
const { Post } = require('./graphql/resolvers/post');
const { Category } = require('./graphql/resolvers/category');

async function startApolloServer() {
  
  const server = new ApolloServer({ 
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Category,
    },
    context:({ req }) => {
      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA0ZjhhM2RiNzM3OTNiMTEwNjc0NGQiLCJlbWFpbCI6InRlc3R1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTYyODU0MzMxOCwiZXhwIjoxNjI5MTQ4MTE4fQ.4eKmMeXVoy9L7giVPLtupP4woVhkS9xkNq5VhitdF7Q`
      req.headers.authorization = token

      return { req }
    }
  });

  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000
  
  try {
    await mongose.connect(`mongodb+srv://CodingAdminThirty:kl453j6kl456j534m@cluster0.z8xy6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    error => console.error("SERVER ERROR: ", error)
  }
  
  app.listen(PORT, () => { console.log("Running") })

}

startApolloServer()