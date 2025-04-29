import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from "node:fs/promises"
import { resolvers } from './resolver.js';
import { getUser } from './db/users.js';

const PORT = 9000;

const app = express();

app.use(cors(), express.json(), authMiddleware);
app.post('/login', handleLogin);

async function getContext({req}) {
  if(req.auth){
    const user = await getUser(req.auth.sub);
    return {user}
  }
  return {}
}
//apolo server setup
const typeDefs = await readFile('./schema.graphql', 'utf8');
const apolloServe = new ApolloServer({ typeDefs, resolvers });
await apolloServe.start();
app.use('/graphql', apolloMiddleware(apolloServe, {context: getContext}));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
