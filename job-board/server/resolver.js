import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root, args) => getJob(args.id),
        company: async (_root, args) =>{
            const company = await getCompany(args.id);
            if(!company){ 
                throw new GraphQLError("Company not found with id:"+args.id, {
                    extensions: {code: "NOT_FOUND"}
                })
            }
            return company;
        }    
    },
    Job: {
        date: (job) => job.createdAt.slice(0, 10),
        company: (job) => getCompany(job.companyId)
    },
    Company: {
        jobs: (company)=> getJobsByCompany(company.id)
    }
}
