import React, { useState, useEffect } from "react";
import Job from "../components/Job";
import UseAxios from "../hooks/UseAxios";

const AllJobs = () => {
  const authSecure = UseAxios();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    authSecure
      .get("/allJobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.error(err));
  }, [authSecure]);

  return (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          All <span className="text-primary font-bold">{jobs.length}</span> Jobs
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
        {jobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
