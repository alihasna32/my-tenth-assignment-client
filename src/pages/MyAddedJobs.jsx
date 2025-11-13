import React, { useEffect, useState, useContext } from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecurity";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyAddedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const authSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return;

    authSecure
      .get(`/myAddedJobs?email=${user.email}`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error loading added jobs:", err);
        setLoading(false); 
      });
  }, [authSecure, user]);

  
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await authSecure.delete(`/deleteJob/${id}`);

      if (res.data.deletedCount > 0) {
        setJobs((prevJobs) => prevJobs.filter((jobs) => jobs._id !== id));

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Jobs cancelled successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "You are not authorized to Delete this job.",
        });
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to cancel job",
        text: "Please try again later.",
      });
    }
  };

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-10">
          My added jobs <span className="text-primary font-bold">{jobs.length}</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Job Info</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 ? (
              jobs.map((task, index) => {
                return (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={task.coverImage} alt={task.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{task.title}</div>
                          <div className="text-sm opacity-50">
                            {task.summary?.slice(0, 40)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-ghost badge-sm text-white bg-secondary">
                        {task.category}
                      </span>
                    </td>

                    <td className="text-sm text-gray-400">
                      {task.postedBy || "Unknown"}
                    </td>

                    <td className="flex gap-3 items-center mt-2.5">
                      <Link
                        to={`/jobDetails/${task._id}`}
                        className="btn btn-primary btn-xs"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="outline-1 outline-error text-[10px] px-2 py-1 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  You haven’t added any jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedJobs;
