import React from 'react'
import hero_bg from '../assets/imgs/hero_bg.png'
import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'

const Home = () => {
    return (

        <div>
            <Hero />
            <FeaturesSection />
            <WhyChooseUsSection />
        </div>
    )
}

export default Home
