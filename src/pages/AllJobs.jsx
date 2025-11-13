import React, { useState, useEffect } from "react";
import Job from "../components/Job";
import UseAxios from "../hooks/UseAxios";

const AllJobs = () => {
  const axios = UseAxios();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");

  const fetchJobs = async (sortValue) => {
    setLoading(true);
    try {
      const res = await axios.get(`/allJobs?sort=${sortValue}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(sort);
  }, [sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-3 sm:mb-0">
          All <span className="text-primary">{jobs.length}</span> Jobs
        </h2>

        <div className="flex items-center gap-3">
          <label className="text-gray-500 dark:text-gray-300 font-medium">
            Sort by:
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-base-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="latest">Latest date</option>
            <option value="oldest">Previous date</option>
          </select>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No jobs found 😔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
