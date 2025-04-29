import { GraphQLClient } from "graphql-request";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

const ApolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache()
});
const client = new GraphQLClient('http://localhost:9000/graphql', {
    headers: () => {
        const accessToken = getAccessToken();
        if (accessToken) {
            return { 'Authorization': `Bearer ${accessToken}` };
        }
        return {};
    }
});

const getJobs = async () => {
    const query = gql`
    query{
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

    const data = await client.request(query);
    return data.jobs;
}

const getJobByID = async (id) => {
    const query = gql`
    query{
        job(id: "${id}") {
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
    const data = await client.request(query);
    return data.job;
}


const getCompanyByID = async (id) => {
    const query = gql`
    query{
        company(id:"${id}") {
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

    const data = await client.request(query);
    console.log(data)
    return data.company;
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
    const data = await client.request(mutation, {
        input: { title, description }
    });
    console.log(data);

    return data.job;
}

export { getJobs, getJobByID, getCompanyByID, createJob };