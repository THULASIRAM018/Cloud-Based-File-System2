import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useUserContext } from "../../Context Api/UserContext";
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
import "./style.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

<<<<<<< HEAD

function LoginForm() {
  const navigate = useNavigate();
  const { setUserName } = useUserContext();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  // Always use the correct backend port for development
  // For production, set VITE_API_BASE_URL in .env to your deployed backend URL
  const API_BASE_URL = "http://localhost:5000";
=======
function LoginForm() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const API = import.meta.env.VITE_API_URL;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError("Please fill all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await axios.post(
<<<<<<< HEAD
        `${API_BASE_URL}/login`,
=======
        `${API}/api/auth/login`,
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        { userName: name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
<<<<<<< HEAD
        setUserName(name); // Set user context for dashboard and protected route
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        Swal.fire({
          icon: "success",
          title: message,
          customClass: {
            popup: "custom-swal-popup",
          },
        });
<<<<<<< HEAD
        navigate("/dashboard");
=======
        navigate(`/dashboard/${name}`);
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      } else {
        setError(message);
      }
    } catch (err) {
      const error = err as any; // OR use AxiosError from axios types
      console.error("Login error:", error.response?.data || error.message);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <div className="h-screen">
        <div className="h-3/6 bg-black"></div>
        <div className="h-3/6 bg-violet-400"></div>
        <div className="login-container bg-white">
          <div className="flex justify-center">
            <img
              className="w-[55%] cursor-pointer"
              onClick={() => navigate("/")}
              src="https://adnan-tech.com/apps/cloud-box/images/logo.png"
              alt=""
            />
          </div>
          {/* <div className="flex justify-center">
              <h2 className="text-3xl font-medium">Login</h2>
            </div> */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1.5 rounded relative text-center mt-2">
              {error}
            </div>
          )}
          <div>
            <form action="" onSubmit={handleSubmit} className="">
              <input
                className="w-full p-1.5 mt-5 outline-violet-700 border-[1.5px] border-gray-400 rounded-md my-1.5"
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-1.5  outline-violet-700 border-[1.5px] border-gray-400 rounded-md my-1"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full mt-3 text-xl bg-violet-600 text-white p-2 rounded-lg cursor-pointer">
                Login
              </button>
            </form>
          </div>
          <div className="text-center my-1">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
