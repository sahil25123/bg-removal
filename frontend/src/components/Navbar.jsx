import React from 'react'
import { assets } from '../assets/assets.js'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
        <div className='flex items-center justify-between mx-4 py-3 lg:,x-44'>
          <Link to="/"><img src={assets.logo}></img></Link>
          <Link to = "/result">
          
             <button className='bg-zinc-800 text-white
              flex items-center gap-4 px-4 py-2 '>Get started<img  className="w-3 sm:w-3" src={assets.arrow_icon}></img></button></Link>
        </div>
      
    </div>
  )
}

export default Navbar
