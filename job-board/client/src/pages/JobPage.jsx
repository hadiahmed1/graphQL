import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { getJobByIDQuery } from '../lib/graphql/queries';
import { useQuery } from '@apollo/client';

const useJob = (id)=>{
  const {data, loading, error}= useQuery(getJobByIDQuery,{
    variables:{id}
  });
  return {job: data?.job, loading, error: Boolean(error)}
}

function JobPage() {
  const { jobId } = useParams();
  const {job,loading, error} = useJob(jobId);
  if(loading) return(<>Loading....</>);
  if(error) return(<>Error: Couldn't load data</>);
  return (
    <div>
      {job ? <>
        <h1 className="title is-2">
          {job.title}
        </h1>
        <h2 className="subtitle is-4">
          <Link to={`/companies/${job.company.id}`}>
            {job.company.name}
          </Link>
        </h2>
        <div className="box">
          <div className="block has-text-grey">
            Posted: {formatDate(job.date, 'long')}
          </div>
          <p className="block">
            {job.description}
          </p>
        </div></> : <>Loading..</>}

    </div>
  );
}

export default JobPage;
