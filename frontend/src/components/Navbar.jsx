import React  , {useContext, useEffect} from 'react';
import { assets } from '../assets/assets.js';
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const {credit , loadCreditData} = useContext(AppContext)

  // console.log(credit);

  useEffect(() =>{
    if(isSignedIn){
      loadCreditData;
    }

  },[isSignedIn , loadCreditData])
 
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover effect */}
          <Link to="/" className="flex items-center">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="h-8 sm:h-10 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/result" 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  My Results
                </Link>
                {/* Credits Button */}
                <button  onClick={()=>navigate("/buy")} className="flex items-center gap-2 px-3 py-2 bg-white-100 rounded-lg"> 
                  <img  className="w-5 h-5" src={assets.credit_icon} alt="Credits"/>
                  <span className="text-sm font-medium">Credits: {credit}</span>
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => openSignIn({})}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                  flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg 
                  transition-all duration-300 hover:scale-105 transform"
                >
                  Get Started
                  <img 
                    className="w-3 h-3 sm:w-3 sm:h-3 animate-pulse" 
                    src={assets.arrow_icon} 
                    alt="Arrow"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;