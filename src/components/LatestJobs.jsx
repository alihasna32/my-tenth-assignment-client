import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import UseAxios from "../hooks/UseAxios";
const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const axios = UseAxios();
  const { loading } = use(AuthContext);
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    if (loading) return;
    axios
      .get("/allLatestJobs")
      .then((res) => setJobs(res.data.slice(0, 6)))
      .catch((err) => console.error("Failed to load jobs:", err));
    setLoadings(false);
  }, [axios, loading]);

  if (loadings) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="pb-2">
      <section className="max-w-full mx-auto mt-12 ">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest <span className="text-primary">{jobs.length}</span> Jobs
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="card bg-base-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <figure className="h-40 w-full overflow-hidden">
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-sm">
                    {job.summary?.slice(0, 60)}...
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm py-1 text bg-secondary px-1.5 rounded-xl font-medium">
                      {job.category}
                    </span>
                    <Link to={`/jobDetails/${job._id}`}>
                      <button className="btn btn-sm btn-primary rounded-lg">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">
            No jobs available right now.
          </p>
        )}
      </section>
    </div>
  );
};
export default LatestJobs;
