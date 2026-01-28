import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

// creating Authentication context

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
     
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [isAdmin,setIsAdmin] = useState(true);
    // Login function to handle user authentication 

    const register = async(credentials) => {
        try {
            console.log("AuthContext register called with:", {  credentials });
            const {data} = await axios.post(`/api/auth/register`,credentials);
            if(data.success){
                //setAuthUser(data.userData);
                // console.log(data.userData);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                setToken(data.token);
                localStorage.setItem("token",data.token);
                localStorage.setItem("user", JSON.stringify(data.userData));
                toast.success(data.message);
                return true;
            }
            else{
                toast.error(data.message);
                console.error(data.message);
                return false;

            }
        } catch (error) {
            const message =error.response?.data?.message || "Something went wrong";
            toast.error(message);
            return false;
            
        }
    }

    // const login = async( credentials )=>{
    //     try {
    //         console.log("AuthContext login called with:", {  credentials });
    //         const {data} = await axios.post(`/api/auth/login`,credentials);
    //         if(data.success){
    //             setAuthUser(data.userData);
    //             axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    //             setToken(data.token);
    //             localStorage.setItem("token",data.token);
    //             toast.success(data.message);
    //             return true;
    //         }
    //         else{
    //             toast.error(data.message);
    //             return false;

    //         }
            
    //     } catch (error) {
    //         toast.error(error.message);
    //         return false;
            
    //     }
    // }

 const login = async (credentials) => {
  try {
    console.log("Sending login payload:", credentials);

    const { data } = await axios.post(
      "/api/auth/login",
      credentials,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    );

    if (data.success) {
      
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      setToken(data.token);
    //   setAuthUser(data.userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data["userData"]));
      //setAuthUser(data["userData"]);
      //console.log(authUser);

      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      console.error(error.response?.data?.message);
      return false;
    }
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed";
    toast.error(message);
    return false;
  }
};
    // Logout function to handle user logout 

    const logout = async ()=>{
        localStorage.removeItem("token");
        setToken(null);
        console.log(authUser)
        setAuthUser(null);
        localStorage.removeItem("user");
        setIsAdmin(false);
        axios.defaults.headers.common["Authorization"] = null;

        toast.success("Logged out successfully");
    }

    // update Profile function to handle user profile Updates

    const updateProfile = async (body)=>{
        try {
            const {data}  = await axios.put("/api/auth/update",body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated Successfully");
            }
            
        } catch (error) {
            toast.error(error.message);
            
        }
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

    },[token])

    const value = {
           axios,
           authUser,
           setAuthUser,
           login,
           register,
           logout,
           updateProfile,
           isAdmin,
           setIsAdmin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}




