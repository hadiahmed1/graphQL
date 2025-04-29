import { useParams } from 'react-router';
import JobList from '../components/JobList.jsx';
import { useQuery } from '@apollo/client';
import { companyByIDQuery } from '../lib/graphql/queries.js';

const useCompany=(id) => {
  const {data, loading, error} = useQuery(companyByIDQuery,{
    variables: {id}
  });
  return {company: data?.company, loading, error: Boolean(error)};
} 

function CompanyPage() {
  const { companyId } = useParams();
  const {company, loading, error} = useCompany(companyId);
  if(loading) return(<>Loading....</>);
  if(error) return(<>Error: Couldn't load data</>)
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <br />
      <strong>Jobs:</strong>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
