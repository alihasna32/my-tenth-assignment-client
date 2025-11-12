import React, { useEffect, useState, useContext } from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecurity";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyAcceptedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const authSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    authSecure.get(`/my-accepted-tasks?email=${user.email}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error loading accepted tasks:", err));
  }, [authSecure, user]);


  const handleDone = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Done it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await authSecure.delete(`/deleteAcceptedTask/${id}`);

      if (res.data.deletedCount > 0) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Task Done successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Done failed",
          text: "You are not authorized to done this job.",
        });
      }
    } catch (err) {
      console.error("Error doneing job:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to done job",
        text: "Please try again later.",
      });
    }
  };
  const handleCancel = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await authSecure.delete(`/deleteAcceptedTask/${id}`);

      if (res.data.deletedCount > 0) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Task cancelled successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Cancel failed",
          text: "You are not authorized to cancel this job.",
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

  return (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          My accepted tasks <span className="text-primary font-bold">{tasks.length}</span>
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
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
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
                      <span className="badge badge-ghost badge-sm">
                        {task.category}
                      </span>
                    </td>

                    <td className="text-sm text-gray-400">
                      {task.postedBy || "Unknown"}
                    </td>

                    <td className="flex gap-3 items-center">
                      <button
                        onClick={() => handleDone(task._id)}
                        className="btn btn-success btn-xs"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleCancel(task._id)}
                        className="outline-1 outline-error text-[10px] px-2 py-1 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  You haven’t accepted any tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
