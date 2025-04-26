import { getJobs } from "./db/jobs.js"
import { getCompany } from "./db/companies.js";
export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: () => {
            return {
                id: "test-ID",
                title: "Job Title",
                description: "Job DESC"
            }
        }
    },
    Job: {
        date: (job) => job.createdAt.slice(0, 10),
        company: (job) => getCompany(job.companyId)
    }
}