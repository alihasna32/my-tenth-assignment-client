import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import xLogo from "../assets/X-logo-twitter-1024x574.jpg.png";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import react from "../assets/react.png";
import amazon from "../assets/amazon.png";
import apple from "../assets/apple-logo-png_seeklogo-158010.png";
import nike from "../assets/nike.png";

const OurSponsor = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="gap-3 bg-base-200 py-8 my-16 rounded-2xl container mx-auto px-5"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10"
      >
        Our <span className="text-primary">Sponsors</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Marquee pauseOnHover={true} speed={200}>
          {[xLogo, apple, google, react, facebook, amazon, nike].map(
            (img, i) => (
              <img
                key={i}
                className="w-[150px] ml-15"
                src={img}
                alt="Sponsor Logo"
              />
            )
          )}
        </Marquee>
      </motion.div>
    </motion.div>
  );
};

export default OurSponsor;
