import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../hooks/UseAxiosSecurity";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const authSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  useEffect(() => {
    authSecure
      .get(`/allJobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error loading job:", err));
  }, [authSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      title: e.target.title.value,
      category: e.target.category.value,
      summary: e.target.summary.value,
      coverImage: e.target.coverImage.value,
    };

    try {
      const res = await authSecure.patch(`/updateJob/${id}`, updateData);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your job has been updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allJobs");
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made or not authorized.",
        });
      }
    } catch (error) {
      console.error("Error updating job:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update job",
        text: "Please try again later.",
      });
    }
  };

  if (!job.title) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-xl my-10 overflow-hidden wrap-break-word">
      
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-400">
          Update Job
        </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={job.title}
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            defaultValue={job.category}
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Job Summary
          </label>
          <textarea
            name="summary"
            rows="5"
            defaultValue={job.summary}
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            name="coverImage"
            defaultValue={job.coverImage}
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full btn bg-indigo-500 text-white font-semibold rounded-xl py-3 transition-all"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default Update;
