import { useParams } from 'react-router';
import JobList from '../components/JobList.jsx';
import { useQuery } from '@apollo/client';
import { companyByIDQuery } from '../lib/graphql/queries.js';

function CompanyPage() {
  const { companyId } = useParams();

  const result = useQuery(companyByIDQuery,{
    variables: {id: companyId}
  });
  console.log(result);
  const company = result?.data?.company;
  // const company = result.data.company;
  // const company =data.company;
  // const [state, setState] = useState({
  //   company: null,
  //   loading: true,
  //   error: false
  // });
  // useEffect(() => {
  //   (async ()=>{
  //     try {
  //       const company = await getCompanyByID(companyId);
  //       setTimeout(() => {
  //         setState({company, loading: false, error: false});
  //       }, 1000);
  //     } catch (error) {
  //       console.log(error);
  //       setState({company: null, loading: false, error: true})
  //     }
  //   })();
  // }, [])
  if(result.loading) return(<>Loading....</>);
  if(result.error) return(<>Error: Couldn't load data</>)
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
