import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseAxios from "../hooks/UseAxios";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("Development");

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

          return {
            name: cat,
            jobs: jobsInCategory,
            image,
          };
        });

        setCategories(groupedCategories);
      } catch (error) {
        console.error("❌ Failed to load categories:", error);
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
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
      }`}
    >
      {category}
    </button>
  );

  return (
    <section className="max-w-7xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        🌟 Top <span className="text-primary">Categories</span>
      </h2>

      <div className="flex justify-center gap-4 mb-12">
        <CategoryToggle category="Development" />
        <CategoryToggle category="Design" />
      </div>

      {currentCategory && currentCategory.jobs.length > 0 ? (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10"
        >
          {currentCategory.jobs.map((job, i) => (
            <motion.div
              key={job._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={job.coverImage}
                alt={job.title}
                className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/10 to-transparent"></div>


              <div className="absolute inset-0 border border-transparent group-hover:border-primary/60 rounded-2xl transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No jobs found in <span className="font-semibold">{selectedCategory}</span>.
        </p>
      )}
    </section>
  );
};

export default TopCategories;
