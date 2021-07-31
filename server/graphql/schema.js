const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(userId: ID!): User!
    isAuth: User!
    post(postId: ID!): Post!
    posts: [Post]!
    category: [Category]!
  }

  type Mutation {
    signUp(fields: AuthInput!): User!
    signIn(fields: AuthInput!): User!
    updateUserProfile(firstName: String!, lastName: String!, userId: ID!): User!
    updateUserLogin(email: String, password: String, userId: ID!): User!

    createPost(fields: PostInput!): Post!
    updatePost(fields: PostInput!): Post!

    createCategory(name: String!): Category!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    token: String
    posts: [Post!]!
    categories: [Category!]!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Category {
    _id: ID!
    name: String!
    author: User!
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    excerpt: String!
    content: String!
    status: PostStatus
    created_at: String
    updated_at: String
    author: User!
  }

  input PostInput {
    title: String
    excerpt: String
    content: String
    status: PostStatus
    category: ID
  }

  enum PostStatus {
    DRAFT
    PUBLISHED
  }

 
`;

module.exports = typeDefs;
