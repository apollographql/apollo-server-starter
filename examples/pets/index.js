
const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  enum PetType {
    Cat,
    Dog
  }

  type Pet {
    name: String!
    petType: PetType!
  }

  type Query {
    pets: [Pet!]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    pets: (root, args, context) => {
      return [
        { name: "Sandy", petType: 'Cat' },
        { name: "Hank", petType: 'Dog' }
      ]
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
