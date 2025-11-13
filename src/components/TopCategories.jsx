import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseAxios from "../hooks/UseAxios";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Development");
  const [loading, setLoading] = useState(true);
  const axios = UseAxios();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/allJobs");
        const filteredJobs = res.data.filter(
          (job) => job.category === "Development" || job.category === "Design"
        );

        const groupedCategories = ["Development", "Design"].map((cat) => {
          const jobsInCategory = filteredJobs.filter(
            (job) => job.category === cat
          );
          const image =
            jobsInCategory.find((job) => job.coverImage)?.coverImage ||
            "https://i.ibb.co/7rckZXN/default-job.jpg";
          return { name: cat, jobs: jobsInCategory, image };
        });

        setCategories(groupedCategories);
      } catch (error) {
        console.error("❌ Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axios]);

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  const CategoryToggle = ({ category }) => (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
        selectedCategory === category
          ? "bg-primary text-white shadow-lg scale-105 btn"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer"
      }`}
    >
      {category}
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-6">
          🌟 Top <span className="text-primary">Categories</span>
        </h2>
        <div className="flex justify-center gap-4">
          <CategoryToggle category="Development" />
          <CategoryToggle category="Design" />
        </div>
      </motion.div>

      {currentCategory && currentCategory.jobs.length > 0 ? (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {currentCategory.jobs.map((job, i) => (
            <motion.div
              key={job._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={job.coverImage}
                alt={job.title}
                className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/60 rounded-2xl transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No jobs found in{" "}
          <span className="font-semibold">{selectedCategory}</span>.
        </p>
      )}
    </section>
  );
};

export default TopCategories;
