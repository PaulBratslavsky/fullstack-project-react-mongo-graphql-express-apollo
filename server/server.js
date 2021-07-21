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
    } 
  });

  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000
  
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