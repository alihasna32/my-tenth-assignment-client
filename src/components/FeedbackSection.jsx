import { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { motion } from "framer-motion";

const FeedbackSection = () => {
  const [yes, setYes] = useState(false);

  const handleYesOrNo = () => {
    setYes(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center container mx-auto rounded-2xl"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/7tXX7cPV/medium-shot-woman-with-thumbs-up.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

      {/* Content */}
      <div className="relative text-center text-white">
        {/* Play Button */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <BiPlay className="text-white w-8 h-8" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Need your <span className="text-primary">Feedback</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-200 mb-6"
        >
          Are you like our website?
        </motion.p>

        {/* Buttons */}
        {yes ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-lg font-semibold"
          >
            Thanks for your feedback 💖
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center"
          >
            <button
              onClick={handleYesOrNo}
              className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-[#7a88f0] transition cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={handleYesOrNo}
              className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              No
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default FeedbackSection;
