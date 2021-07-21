const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Query {
      hello:String!
  }

  type Mutation {
    signUp(fields: AuthInput!):User!
    signIn(fields: AuthInput!):User!
  }

  type User {
    _id: ID!
    email:String!
    password:String!
    firstName:String
    lastName:String
    token:String
  }

  input AuthInput {
    email:String!
    password:String!
  }
`

module.exports = typeDefs