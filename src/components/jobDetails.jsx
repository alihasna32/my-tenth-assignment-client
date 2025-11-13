import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import UseAxiosSecure from "../hooks/UseAxiosSecurity";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext);
  const authSecure = UseAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setLoading(true); 
    authSecure
      .get(`/allJobs/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
      })
      .finally(() => setLoading(false)); 
  }, [authSecure, user, id]);

  const handleDelete = async () => {
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

    setLoading(true); 
    try {
      const res = await authSecure.delete(`/deleteJob/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Job deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allJobs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "You are not authorized to delete this job.",
        });
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to delete job",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false); 
    }
  };

  const handleAccept = async () => {
    if (!job || !user) return;
    const { title, category, summary, coverImage, postedBy, userEmail } = job;

    setLoading(true); 
    try {
      const acceptedTask = {
        jobId: id,
        title,
        category,
        summary,
        coverImage,
        postedBy,
        jobOwnerEmail: userEmail,
        userEmail: user?.email,
        acceptedAt: new Date(),
      };

      const res = await authSecure.post(
        `/accept-task?email=${user.email}`,
        acceptedTask
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Task accepted successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/myAcceptedTasks");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to accept task!",
          text: "Please try again.",
        });
      }
    } catch (error) {
      console.error("Accept error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <p>Job not found or unauthorized access.</p>
      </div>
    );
  }

  const { title, category, summary, coverImage, postedBy, userEmail } = job;

  return (
    <div className="p-5 md:p-10 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-xl">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-5"
        />

        <h1 className="text-3xl font-bold mb-3 leading-12">{title}</h1>

        <div className="text-sm text-gray-400 mb-2 flex justify-between items-center py-3">
          <h1 className="text-[16px] font-medium">Posted by: {postedBy}</h1>
          <p className="inline-block bg-secondary px-3 py-1 rounded-lg text-white">
            {category}
          </p>
        </div>

        <p className="text-lg text-base-content mb-5 leading-relaxed">{summary}</p>

        <div className="flex justify-between">
          {user?.email === userEmail ? (
            <>
              <Link to={`/updateJob/${id}`} className="btn btn-primary">
                Update
              </Link>
              <button
                onClick={handleDelete}
                className="px-5 rounded-[5px] outline-1 outline-secondary cursor-pointer"
              >
                Delete
              </button>
            </>
          ) : (
            <div className="flex justify-center items-center w-full gap-3">
              <p className="bg-error italic rounded-xl px-3 py-1 text-base-content text-center">
                You can’t edit or delete this job.
              </p>
              <button onClick={handleAccept} className="btn btn-success">
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
