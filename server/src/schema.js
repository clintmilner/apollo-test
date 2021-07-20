const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!

    "get a single Track"
    track(id: ID!): Track
  }
  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
  }
  "Author of a complete Track"
  type Author {
    id: ID!
    name: String!
    photo: String
  }
  "Modules for a Track"
  type Module {
    id: ID!
    title: String!
    length: Int
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }
  type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }
`;
module.exports = typeDefs;
