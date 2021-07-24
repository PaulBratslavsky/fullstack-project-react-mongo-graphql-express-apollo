const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(userId: ID!): User!
    isAuth: User!
    post(postId: ID!): Post!
    posts:[Post]!
  }

  type Mutation {
    signUp(fields: AuthInput!): User!
    signIn(fields: AuthInput!): User!
    updateUserProfile(firstName: String!, lastName: String!, userId: ID!): User!
    updateUserLogin(email: String, password: String, userId: ID!): User!
    
    createPost(fields: PostInput!): Post!
    updatePost(fields: PostInput!): Post!
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

  type Post {
    _id: ID!
    title: String!
    excerpt: String!
    content: String!
    author: User!
    status: PostStatus
    created_at: String
    updated_at: String
  },

  input PostInput {
    title: String
    excerpt: String
    content: String
    status: PostStatus
  }

  enum PostStatus {
    DRAFT
    PUBLISHED
  }
  
`;

module.exports = typeDefs;
