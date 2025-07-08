import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {  // Destructure children directly
    const [credit, setCredit] = useState(5);
    const [image , setImage] = useState(false);
    const [resultImage  , setResultImage]   = useState(false);
    const navigate = useNavigate();


    
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { getToken } = useAuth();
    const {isSignedIn} = useUser();
    const {openSignIn} = useClerk();



    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Standard auth header format
                }
            });
            
            if (data.success) {
                setCredit(data.credit);
            }

        } catch (e) {
            console.error("Failed to load credits:", e);
            toast.error(e.response?.data?.message || e.message);  // Show server error if available
        }
    };
    const removeBg = async (image) =>{
        try{

            if(!isSignedIn){
                return openSignIn();
            }
            setImage(image);
            setResultImage(false);
            navigate("/result")


            // console.log(image)
        }
        catch(e){
            console.log(e.message);
            toast.error(e.response?.data?.message || e.message);

        }
    }





    const value = {
        credit,
        setCredit,
        loadCreditsData, 
        backendUrl,
        image, 
        setImage
    };

    return (
        <AppContext.Provider value={value}>
            {children}  {/* Fixed typo: childern -> children */}
        </AppContext.Provider>
    );
};

export default AppContextProvider;