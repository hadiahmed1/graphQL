import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from "node:fs/promises"
import { resolvers } from './resolver.js';
import { isUtf8 } from 'node:buffer';

const PORT = 9000;

const app = express();

app.use(cors(), express.json(), authMiddleware);
app.post('/login', handleLogin);

//apolo server setup
const typeDefs = await readFile('./schema.graphql', 'utf8');
const apolloServe = new ApolloServer({ typeDefs, resolvers });
await apolloServe.start();
app.use('/graphql', apolloMiddleware(apolloServe));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
