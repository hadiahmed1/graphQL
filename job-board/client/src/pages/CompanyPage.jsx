import { useParams } from 'react-router';
import { getCompanyByID, getJobByID } from '../lib/graphql/queries.js';
import { useState, useEffect } from 'react';
import JobList from '../components/JobList.jsx';

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false
  });
  useEffect(() => {
    (async ()=>{
      try {
        const company = await getCompanyByID(companyId);
        setTimeout(() => {
          setState({company, loading: false, error: false});
        }, 2000);
      } catch (error) {
        console.log(error);
        setState({company: null, loading: false, error: true})
      }
    })();
  }, [])
  if(state.loading) return(<>Loading....</>);
  if(state.error) return(<>Error: Couldn't load data</>)
  return (
    <div>
      <h1 className="title">
        {state.company.name}
      </h1>
      <div className="box">
        {state.company.description}
      </div>
      <br />
      <strong>Jobs:</strong>
      <JobList jobs={state.company.jobs} />
    </div>
  );
}

export default CompanyPage;
