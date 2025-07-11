import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { SignIn, SignInButton } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </AppContextProvider>
  );
}

export default App;
