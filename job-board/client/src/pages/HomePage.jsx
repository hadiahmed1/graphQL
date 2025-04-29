import JobList from '../components/JobList';
import { useState, useEffect } from 'react';
import {getJobs} from '../lib/graphql/queries.js';
function HomePage() {
  useEffect(() => {
    const getData = async () => {
      const data = await getJobs(5,10);
      setJobs(data);
    }
    getData();
  }, [])
  const [jobs, setJobs] = useState([]);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
