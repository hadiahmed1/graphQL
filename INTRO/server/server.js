import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

const port = 3000;
const schema = buildSchema(`
    type Query{
        greeting: String,
    }`
);
const root = {
    greeting(){
        return "helloworld"
    }
}
// const typeDefs = `#graphql
//     type Query{
//         greeting: String,
//     }
// `;

// const resolver ={
//     Query :{
//         greeting: ()=>"Hello GraphQL"
//     }
// }

const app = express();
app.all("/graphql", createHandler({schema, rootValue: root, graphiql:true}));

app.listen(port, ()=>{
    console.log("GraphQL listening on Port:", port);
})