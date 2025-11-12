import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import UseAxiosSecure from "../hooks/UseAxiosSecurity";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddAJobs = () => {
  const { user } = use(AuthContext);
  const authSecure = UseAxiosSecure();
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Log in Please",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset()
        return
    }
    const data = {
      title: e.target.title.value,
      postedBy: user.displayName,
      category: e.target.category.value,
      summary: e.target.summary.value,
      coverImage: e.target.coverImage.value,
      userEmail: user.email,
      postedTime: new Date(),
    };

    try {
      const res = await authSecure.post(`/addJob?email=${user.email}`, data);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your job has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate('/allJobs')
      e.target.reset();
    } catch (error) {
      console.error("Error adding job:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add job",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-xl my-10">

      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-400">
          Add a Jobs
        </h2>
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Posted By
          </label>
          <input
            type="text"
            name="postedBy"
            value={user?.displayName}
            readOnly
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
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
            placeholder="Write a short job description..."
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
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
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            User Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email}
            readOnly
            className="w-full border border-gray-600 bg-base-200 text-gray-600 rounded-xl p-3 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full btn bg-indigo-500 text-white font-semibold rounded-xl py-3 transition-all"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddAJobs;
