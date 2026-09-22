import axios from "axios"
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";


export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
<<<<<<< HEAD
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
=======
  const API = import.meta.env.VITE_API_URL;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

  useEffect(() => {
    const validate = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${API_BASE_URL}/verify-token`, { withCredentials: true });
        console.log("/verify-token response:", response.data);
        const { success } = response.data;
        setIsAuthenticated(success);
      } catch (error) {
        console.error("/verify-token error:", error);
=======
        const response = await axios.get(`${API}/api/auth/verify-token`, {
          withCredentials: true,
        });
        const { success } = response.data;
        setIsAuthenticated(success);
      } catch (error) {
        console.error(error);
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        setIsAuthenticated(false);
      }
    };
    validate();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login to continue.",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


// // export const getUserDetails=async(setUser)=>
// // {
// //     try {
// //         const response = await axios.get('http://localhost:3000/verify-token', { withCredentials: true })
// //         const { status, user } = response.data
// //         if (status) {
// //             setUser(user)
// //         }
// //     } catch (error) {
// //         console.error(error)
// //     }
// // }