import React from "react";
import { Link } from "react-router";

const Job = ({ job }) => {
  const { _id, title, category, summary, coverImage, postedBy } = job;

  return (
    <div className="bg-base-100 text-white p-4 shadow-xl rounded-2xl overflow-hidden flex flex-col">
      <img
        src={coverImage}
        alt={title}
        className="object-cover w-full hover:scale-110 transition-transform duration-300"
      />

      <div className="flex justify-between my-2">
        <strong className="text-sm text-gray-400">{postedBy}</strong>
        <p className="text-sm bg-secondary px-1.5 rounded-xl font-medium">
          {category}
        </p>
      </div>

      <h2 className="text-neutral text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-gray-300 grow">
        {summary.slice(0, 80)}...
      </p>

      <div className="mt-auto pt-3">
        <Link
          to={`/jobDetails/${_id}`}
          className="btn btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Job;
