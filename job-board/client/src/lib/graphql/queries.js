import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');

const getJobs = async () => {
    const query = `#graphql
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
    const query = `#graphql
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
    const query = `#graphql
    query{
        company(id:"${id}") {
            id
            name
            description
        }
    }`

    const data = await client.request(query);
    return data.company;
}

export { getJobs, getJobByID, getCompanyByID };