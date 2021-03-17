
const { ApolloServer, gql } = require("apollo-server");
const db = require('./db')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  enum Genre {
    Pop,
    Rock,
    Alternative
    HipHop,
    Folk
  }

  type Track {
    title: String!
    number: Int!
  }

  type Artist {
    name: String!
  }

  type Album {
    title: String!
    artist: Artist!
    tracks: [Track!]!
    genre: Genre!
  }

  type Query {
    albums(genre: Genre): [Album!]!
    album(title: String!): Album
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    albums: (root, args, context) => {
      const isFilteringByGenre = args && args.genre;

      if (isFilteringByGenre) {
        return context.db.getAlbumsByGenre(args.genre)
      }

      return context.db.getAllAlbums();
    },
    album: (root, args, context) => {
      const albumTitle = args && args.title;

      try {
        return context.db.getAlbumByTitle(albumTitle);
      } catch (err) {
        return null;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ db })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
