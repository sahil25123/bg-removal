import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {  // Destructure children directly
    const [credit, setCredit] = useState(10);
    const [image , setImage] = useState(false);
    const [resultImage  , setResultImage]   = useState(false);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // console.log(backendUrl)

    const { getToken } = useAuth();
    const {isSignedIn ,user} = useUser();
    const {openSignIn} = useClerk();

    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Standard auth header format
                }
            });
            // console.log(data);  for error handling 

            
            if (data.success) {
                setCredit(data.credit);
            }

        } catch (e) {
            console.error("Failed to load credits:", e);
            toast.error(e.response?.data?.message || e.message);  // Show server error if available
        }
    };
    const removeBg = async (image) => {
        try {
            if (!isSignedIn) {
                openSignIn();
                return; // Exit after opening sign-in
            }
            
            if (!image) {
                toast.error("Please select an image first");
                return;
            }

            setImage(image);
            setResultImage(false);
            navigate("/result");
            
            const token = await getToken();
            if (!token) {
                throw new Error("Authentication token not found");
            }

            const formData = new FormData();
            formData.append("image", image);
            // Add user ID to the form data
            if (user?.id) {
                formData.append("clerkId", user.id);
            }

            // console.log("Sending request to:", `${backendUrl}/api/image/remove-bg`);
            // console.log("FormData entries:", [...formData.entries()]);

            // console.log("before the image sending to the backend ")
            const { data } = await axios.post(
                `${backendUrl}/api/image/remove-bg`,
                formData,
                {
                    headers:{token}
            }
            );

            // console.log("After sending to the backend")
            
            // console.log("Response from server:", data);

            if (data.success) {
                setResultImage(data.resultImage);
                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                }
            } else {
                toast.error(data.message || "Failed to process image");
                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                    if (data.creditBalance === 0) {
                        navigate('/buy');
                    }
                }
            }
        } catch (e) {
            console.error("Error in removeBg:", e);
            const errorMessage = e.response?.data?.message || 
                               e.message || 
                               "An error occurred while processing your request";
            toast.error(errorMessage);
            
            // If there was an error, reset the loading states
            setImage(null);
            setResultImage(null);
        }
    }

    
    const value = {
        credit, 
        loadCreditsData, 
        setImage, 
        removeBg, 
        resultImage,
        setResultImage,
        backendUrl,
        getToken
    };

    return (
        <AppContext.Provider value={value}>
            {children}  {/* Fixed typo: childern -> children */}
        </AppContext.Provider>
    );
};

export default AppContextProvider;