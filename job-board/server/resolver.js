import { getJobs } from "./db/jobs.js"
export const resolvers = {
    Query: {
        jobs: async () => {
            const jobs = await getJobs();
            return jobs;
        },
        job: () => {
            return {
                id: "test-ID",
                title: "Job Title",
                description: "Job DESC"
            }
        }
    },
    Job: {
        date: (job) => job.createdAt.slice(0,10),
    }
}