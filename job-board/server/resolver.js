import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js";
export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root, args) => getJob(args.id),
        company: (_root, args) => getCompany(args.id)
    },
    Job: {
        date: (job) => job.createdAt.slice(0, 10),
        company: (job) => getCompany(job.companyId)
    },
    Company: {
        jobs: (company)=> getJobsByCompany(company.id)
    }
}
