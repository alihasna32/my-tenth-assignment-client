import React from 'react'
import Marquee from "react-fast-marquee";
import xLogo from "../assets/X-logo-twitter-1024x574.jpg.png"
import facebook from "../assets/facebook.png"
import google from "../assets/google.png"
import react from "../assets/react.png"
import amazon from "../assets/amazon.png"
import apple from "../assets/apple-logo-png_seeklogo-158010.png"
import nike from "../assets/nike.png"

const OurSponsor = () => {
  return (
    <section className='px-5'>
      <div className="gap-3 bg-base-200 py-8 my-16 rounded-2xl container mx-auto px-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our <span className="text-primary">Sponsors</span>
      </h2>
      <Marquee pauseOnHover={true} speed={200} className='mt-12'>
        <img className='w-[150px] ml-15' src={xLogo} alt=""/>
        <img className='w-[150px] ml-15' src={apple} alt=""/>
        <img className='w-[150px] ml-15' src={google} alt=""/>
        <img className='w-[150px] ml-15' src={react} alt=""/>
        <img className='w-[150px] ml-15' src={facebook} alt=""/>
        <img className='w-[150px] ml-15' src={amazon} alt=""/>
        <img className='w-[150px] ml-15' src={nike} alt=""/>
      </Marquee>
    </div>
    </section>
  )
}

export default OurSponsor