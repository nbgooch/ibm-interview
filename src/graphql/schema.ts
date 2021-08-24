import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getUserById(id: ID!): User
    getUsers: [User]!
  }

  type User {
    _id: ID!
    name: String!
    email: String
    favoriteFood: String
    favoriteColor: String
  }
`;

export default typeDefs;
