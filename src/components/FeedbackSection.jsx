import { useState } from "react";
import { BiPlay } from "react-icons/bi";
const FeedbackSection = () => {
    const [yes, setYes] = useState(false)

    const handleYesOrNo = () =>{
        setYes(true)
    }
  return (
    <div className="px-5">
      <section
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
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <BiPlay className="text-white w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Need your <span className="text-primary">Feedback</span>
        </h2>
        <p className="text-gray-200 mb-6">Are you like our website?</p>

        {/* Buttons */}
        {
            yes ? "Thanks for your feedback" : <div className="flex gap-4 justify-center">
          <button onClick={handleYesOrNo} className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-[#7a88f0] transition cursor-pointer">
            Yes
          </button>
          <button onClick={handleYesOrNo} className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
            No
          </button>
        </div>
        }
      </div>
    </section>
    </div>
  );
};

export default FeedbackSection;
