import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';

const PORT = 9000;

const app = express();
const apolloServe = new ApolloServer({/*typeDefs, resolvers*/ });

app.use(cors(), express.json(), authMiddleware);
app.use('/graphql', apolloMiddleware(apolloServe));

app.post('/login', handleLogin);


await apolloServe.start();
app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
