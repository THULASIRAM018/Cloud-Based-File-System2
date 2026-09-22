import { useEffect } from "react";
import HomeContent from "../Component/HomeContent/HomeContent";
import Navbar from "../Component/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  useEffect(() => {
    const validate = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/verify-token`, {
=======
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const validate = async () => {
      try {
        const response = await axios.get(`${API}/api/auth/verify-token`, {
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
          withCredentials: true,
        });
        const { success, user } = response.data;
        if (success) {
          navigate(`/dashboard/${user.userName}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    validate();
  }, []);
  return (
    <div className="h-screen">
      <Navbar />
      <HomeContent />
    </div>
  );
}

export default Home;
