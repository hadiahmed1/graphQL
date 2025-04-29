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
export const apolloClient = new ApolloClient({
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
                description
            }
        }
    }`
    const result = await apolloClient.query({ query, fetchPolicy: "network-only" })
    return result.data.jobs;
}

const getJobByID = async (id) => {
    const query = gql`
    query JobByID($id: ID!){
        job(id: $id) {
        id
        title
        description
        date
        company {
            id
            name
            description
        }
    }
    }`
    const result = await apolloClient.query({ query, variables: { id } })
    return result.data.job;
}

export const companyByIDQuery = gql`
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
const getCompanyByID = async (id) => {

    const result = await apolloClient.query({ companyByIDQuery, variables: { id } })
    return result.data.company;
}

const createJob = async ({ title, description }) => {
    const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            id
            title
            date
            description
            company {
                id
                name
                description
            }
        }
    }
    `
    const { data } = await apolloClient.mutate({
        mutation,
        variables: { input: { title, description } }
    })
    return data.job
}

export { getJobs, getJobByID, getCompanyByID, createJob };