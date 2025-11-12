import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import banner from "../../assets/banner.jpg";
import "./banner.css";

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden">
        <motion.img
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="w-full h-auto object-cover"
        src={banner}
        alt="banner"
      />
      <motion.div
        className="absolute inset-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center px-5 md:px-10 py-10 md:py-0 text-center lg:text-left w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <motion.div
          className="lg:w-1/2 md:mr-9"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="max-sm:text-[28px] sm:text-4xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-2 2xl:text-8xl">
            Trusted by freelancers and clients.
          </h1>
          <p className="text-base sm:text-[20px] md:text-xl lg:text-2xl max-sm:hidden mb-6 2xl:text-3xl 2xl:leading-relaxed ">
            Work confidently with verified clients and secure payments on a
            trusted platform. Build your reputation with real projects that
            match your skills. Experience transparency, reliability, and growth
            — all in one place. Join thousands of freelancers achieving success
            every day.
          </p>
        </motion.div>

        <motion.div
          className="lg:w-1/2 lg:h-30 flex justify-center lg:justify-center items-center mt-2"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex sm:flex-col lg:flex-row gap-3 sm:gap-5">
            <Link
              to="/addJob"
              className="btn btn-primary flex items-center justify-center  
        px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg
        hover:scale-105 transition-transform rounded-lg"
            >
              Create a Job
            </Link>

            <Link
              to="/allJobs"
              className="btn btn-secondary flex items-center justify-center gap-2 
        px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg
        hover:scale-105 transition-transform rounded-lg"
            >
              All Jobs
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
