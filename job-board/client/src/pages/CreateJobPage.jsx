import { useState } from 'react';
import { createJobMutation, getJobByIDQuery } from '../lib/graphql/queries.js';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';

function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mutate, { loading }] = useMutation(createJobMutation);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: { job } } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: getJobByIDQuery,
          variables: { id: data.job.id },
          data
        });
      }
    })
    console.log(job);
    navigate(`/jobs/${job.id}`)
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button disabled={loading} className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
