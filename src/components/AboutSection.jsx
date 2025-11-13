import React from "react";
import aboutImg from "../assets/aboutSectionPic.jpg";
import { Link } from "react-router";

const AboutSection = () => {
  return (
      <section className="bg-base-200 py-6 px-5 container mx-auto mb-16 rounded-2xl">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            About <span className="text-secondary">Freelance MarketPlace</span>
          </h2>
          <p className="leading-relaxed mb-4">
            Freelance MarketPlace is your trusted platform where talented freelancers and employers connect to 
            get things done efficiently. Whether you are a designer, developer, or content 
            creator — you can find opportunities that match your skills or post jobs that 
            need creativity and passion.
          </p>
          <p className="leading-relaxed mb-6">
            Our goal is to empower people to collaborate globally while maintaining 
            transparency, trust, and reliability in every project. We provide a modern, 
            user-friendly, and secure space for managing freelance work effortlessly.
          </p>
          <div className="flex gap-4">
            <Link to="/allJobs" className="btn btn-primary flex items-center justify-center gap-2 
        px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg
        hover:scale-105 transition-transform rounded-lg">
              Explore More
            </Link>
            <Link to="/addJob" className="btn btn-secondary flex items-center justify-center gap-2 
        px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg
        hover:scale-105 transition-transform rounded-lg">
              Start Journey
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 flex justify-end">
          <img
            src={aboutImg}
            alt="About Freelance MarketPlace"
            className="rounded-2xl shadow-xl w-full max-w-md hover:scale-105 transition-transform duration-500 max-lg:h-[448px]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
