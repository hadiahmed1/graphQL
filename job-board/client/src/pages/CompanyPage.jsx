import { useParams } from 'react-router';
import { getCompanyByID } from '../lib/graphql/queries.js';
import { useState, useEffect } from 'react';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompnay] = useState(null);
  useEffect(() => {
    // getJobByID(jobId).then(job => setJob(job));
    getCompanyByID(companyId).then(company => setCompnay(company));
  }, [])
  if(!company) return(<>Loading....</>);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyPage;
