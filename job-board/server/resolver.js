
export const resolvers = {
    Query : {
        job:()=>{
            return {
                id: "test-ID",
                title: "Job Title",
                description: "Job DESC"
            }
        }
    }
}