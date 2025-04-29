import { ApolloClient, ApolloLink, concat, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";


const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        operation.setContext({
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
    }
    return forward(operation);
})
const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache()
});
// const client = new GraphQLClient('http://localhost:9000/graphql', {
//     headers: () => {
//         const accessToken = getAccessToken();
//         if (accessToken) {
//             return { 'Authorization': `Bearer ${accessToken}` };
//         }
//         return {};
//     }
// });

const getJobs = async () => {
    const query = gql`
    query Jobs{
        jobs {
            id
            title
            date
            company {
                id
                name
            }
        }
    }`
    const result = await apolloClient.query({ query })
    return result.data.jobs;
}

const getJobByID = async (id) => {
    const query = gql`
    query JobByID($id: ID!){
        job(id: $id) {
        company {
            id
            description
            name
        }
        date
        description
        id
        title
    }
    }`
    const result = await apolloClient.query({ query, variables: { id } })
    return result.data.job;
}

const getCompanyByID = async (id) => {
    const query = gql`
    query CompanyByID($id: ID!){
        company(id:$id) {
            id
            name
            description
            jobs {
                id
                title
                date
                company {
                    id
                    name
                }
            }
        }
    }`

    const result = await apolloClient.query({ query, variables: { id } })
    return result.data.company;
}

const createJob = async ({ title, description }) => {
    const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            id
            title
            description
            date
            company {
                name
                description
            }
        }
    }
    `

    const result = await apolloClient.mutate({ mutation, variables: { input: { title, description } } })
    return result.data.job
    // const data = await client.request(mutation, {
    //     input: { title, description }
    // });
    // console.log(data);

    // return data.job;
}

export { getJobs, getJobByID, getCompanyByID, createJob };