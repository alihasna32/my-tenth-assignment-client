import React from 'react'
import Banner from '../components/Banner/Banner'
import LatestJobs from '../components/LatestJobs'
import OurSponsor from '../components/OurSponsor'
import FeedbackSection from '../components/FeedbackSection'
import TopCategories from '../components/TopCategories'
import AboutSection from '../components/AboutSection'

const HomePage = () => {
  return (
    <div>
        <Banner></Banner>
        <LatestJobs></LatestJobs>
        <TopCategories></TopCategories>
        <AboutSection></AboutSection>
        <FeedbackSection></FeedbackSection>
        <OurSponsor></OurSponsor>
    </div>
  )
}

export default HomePage