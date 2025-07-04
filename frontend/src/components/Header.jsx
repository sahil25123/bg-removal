import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
        {/* left side  */}
        <div>
            <h1>Remove the  <br/><span>backgound</span>from  <br/> images for free.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate quidem doloribus sint saepe ex. Sapiente repellendus, <br/> officia incidunt temporibus exercitationem atque quis, eos, maxime ullam nemo excepturi molestiae. Quas?</p>
            <div>
                <input type="file" name="" id="upload1" hidden/>
                <label htmlFor='upload1'>
                    <img src={assets.upload_btn_icon}></img>
                    <p>Upload Your Image</p>
                </label>
             

            </div>
        </div>

        {/* Right Side */}
        <div>

        </div>
      
    </div>
  )
}

export default Header
