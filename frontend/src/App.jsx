import {Routes ,Route} from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Result from "./pages/Result"
import BuyCredit from "./pages/BuyCredit"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { SignIn, SignInButton } from "@clerk/clerk-react"
import {ToastContainer } from "react-toastify";


function App() {
  

  return (
    <div className="min-h-screen bg-slate-50">
     
        <Navbar/>
    <Routes>
    <Route path={"/"} element={<Home/>}/>
    <Route path={"/result"} element={<Result/>}/>
    <Route path={"/buy"} element={<BuyCredit/>}/>
    </Routes>
    <Footer/>
    
    
  </div>
  )
}

export default App
