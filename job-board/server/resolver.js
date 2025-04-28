import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root, args) => getJob(args.id),
        company: async (_root, args) =>{
            const company = await getCompany(args.id);
            if(!company)
                throw notFoundError("No company with ID:"+args.id)
            
            return company;
        }    
    },
    Job: {
        date: (job) => job.createdAt.slice(0, 10),
        company: async (job) => {
            const job = await getCompany(job.companyId);
            if(!job) 
                throw notFoundError("No Job with ID:"+args.id)
            return job;
        }
    },
    Company: {
        jobs: (company)=> getJobsByCompany(company.id)
    }
}

const notFoundError = (message) => {
    return new GraphQLError(message, {
        extensions: {code: "NOT_FOUND"}
    })
}