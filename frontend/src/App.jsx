import {Routes ,Route} from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Result from "./pages/Result"
import BuyCredit from "./pages/BuyCredit"
import Navbar from "./components/Navbar"

function App() {
  

  return (
    <>
    <Navbar/>

  <Routes>
    <Route path={"/"} element={<Home/>}/>
    <Route path={"/result"} element={<Result/>}/>
    <Route path={"/buy"} element={<BuyCredit/>}/>

  </Routes>
  </>
  )
}

export default App
