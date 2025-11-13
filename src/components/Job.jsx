import { Link } from "react-router";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const { _id, title, category, summary, coverImage, postedBy } = job;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-white p-4 shadow-xl rounded-2xl overflow-hidden flex flex-col bg-base-200"
    >
      <img
        src={coverImage}
        alt={title}
        className="object-cover w-full hover:scale-110 transition-transform duration-300"
      />

      <div className="flex justify-between my-2">
        <strong className="text-sm">{postedBy}</strong>
        <p className="text-sm bg-secondary px-1.5 rounded-xl font-medium">
          {category}
        </p>
      </div>

      <h2 className="text-lg font-semibold text-base-content">{title.slice(0, 40)}...</h2>
      <p className="mt-2 grow text-base-content">{summary.slice(0, 60)}...</p>

      <div className="mt-auto pt-3">
        <Link
          to={`/jobDetails/${_id}`}
          className="btn btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Job;
