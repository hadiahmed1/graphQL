import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js"
import { getCompany } from "./db/companies.js";
import { assertInputObjectType, GraphQLError } from "graphql";
import { UnauthorizedError } from "express-jwt";
import { getUser } from "./db/users.js";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root, args) => getJob(args.id),
        company: async (_root, args) => {
            const company = await getCompany(args.id);
            if (!company)
                throw notFoundError("No company with ID:" + args.id)

            return company;
        }
    },
    Job: {
        date: (job) => job.createdAt.slice(0, 10),
        company: async (job) => {
            const company = await getCompany(job.companyId);
            if (!company)
                throw notFoundError("No Company with ID:" + args.id)
            return company;
        }
    },
    Company: {
        jobs: async (company) => {
            const job = await getJobsByCompany(company.id);
            if (!job)
                throw notFoundError("No Job with ID:" + args.id)
            return job;
        }
    },
    Mutation: {
        createJob: async (_root, { input: { title, description } }, { user }) => {
            if (!user) throw unAuthorizedError("jwt auth failed")
            return createJob({ companyId: user.companyId, title, description });
        },
        deleteJob: async (_root, { id }, { user }) => {
            if (!user) throw unAuthorizedError("jwt auth failed");
            const job = await getJob(id);
            if (job.companyId !== user.companyId) throw unAuthorizedError("Invalid user: Not your job")
            return deleteJob(id);
        },
        updateJob: async (_root, { input }, { user }) => {
            if (!user) throw unAuthorizedError("jwt auth failed");
            const job = await getJob(id);
            if (job.companyId !== user.companyId) throw unAuthorizedError("Invalid user: Not your job")
            return updateJob(input)
        }
    }
}

const notFoundError = (message) => {
    return new GraphQLError(message, {
        extensions: { code: "NOT_FOUND" }
    })
}

const unAuthorizedError = (message) => {
    return new GraphQLError(message, {
        extensions: { code: "UN_AUTHORIZED" }
    })
}