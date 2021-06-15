import db from './db';  // see the README for how to manipulate this object

import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
// import ChatBox from './resolvers/ChatBox';
// import Message from './resolvers/Message';

// TODO
// Setup the GraphQL server
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    // ChatBox,
    // Message
  },
  context: {
    db,
    pubsub,
  },
});

// require('dotenv-defaults').config();
// mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});