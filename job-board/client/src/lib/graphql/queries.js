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
export const getJobByIDQuery = gql`
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

export const createJobMutation = gql`
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

export { getJobs };