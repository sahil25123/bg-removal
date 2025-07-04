import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/bg-slider'
import Testimonials from "../components/testimonials"
import Upload from '../components/upload'

const Home = () => {
  return (
    <div>
       <Header/>
       <Steps/>
       <BgSlider/>
       <Testimonials/>
       <Upload/>
      
    </div>
  )
}

export default Home
