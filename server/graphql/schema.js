const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(userId: ID!): User!
    isAuth: User!
  }

  type Mutation {
    signUp(fields: AuthInput!): User!
    signIn(fields: AuthInput!): User!
    updateUserProfile(firstName: String!, lastName: String!, userId: ID!): User!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
