const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongose =  require('mongoose');
const typeDefs = require('./graphql/schema');
const { Query } = require('./graphql/resolvers/queries');
const { Mutation } = require('./graphql/resolvers/mutations');


async function startApolloServer() {
  
  const server = new ApolloServer({ 
    typeDefs,
    resolvers:{
        Query,
        Mutation
    },
    context:({ req }) => {

      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZhMjg3NzZmMTk3YzM4ZWUyNDgxNDQiLCJlbWFpbCI6ImFyaXlhQGVtYWlsLmNvbSIsImlhdCI6MTYyNzAwNzA5NSwiZXhwIjoxNjI3NjExODk1fQ.vOEgiKoPTdrOy8Ngj9FYElpyxbIqE-HQldJPkRoKog4`
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