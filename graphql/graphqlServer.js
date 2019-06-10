const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});

module.exports = server;
