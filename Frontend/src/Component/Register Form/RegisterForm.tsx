import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
<<<<<<< HEAD
  // Use VITE_API_BASE_URL or fallback to localhost:5000
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
=======
  const API = import.meta.env.VITE_API_URL;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !password || !email) {
      setError("Please fill all fields");
      return;
    }
<<<<<<< HEAD
    try {
      const response = await axios.post(
        `${API_BASE_URL}/signup`,
        { userName: name, password, email },
=======
    const formData = new FormData();
    formData.append("userName", name);
    formData.append("password", password);
    formData.append("email", email);

    try {
      const response = await axios.post(
        `${API}/api/auth/register`,
        formData,
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message } = response.data;
      if (success) {
        navigate("/login");
      } else {
        setError(message);
      }
    }  catch (err) {
      const error = err as any; // OR use AxiosError from axios types
      console.error("Login error:", error.response?.data || error.message);
    
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    
      setTimeout(() => setError(''), 3000);
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
              className="w-[60%]  cursor-pointer"
              onClick={() => navigate("/")}
              src="https://adnan-tech.com/apps/cloud-box/images/logo.png"
              alt=""
            />
          </div>
          {/* <p className="text-red-600 text-center pt-3">Please fill all field</p> */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1.5 rounded relative text-center mt-2">
              {error}
            </div>
          )}
          <div>
            <form action="" onSubmit={handleSubmit}>
              <input
                className="w-full p-1.5 mt-3.5 outline-violet-700 border-[1.5px] border-gray-400 rounded-md my-1.5"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Name"
              />
              <input
                className="w-full p-1.5  outline-violet-700 border-[1.5px] border-gray-400 rounded-md my-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="w-full p-1.5  outline-violet-700 border-[1.5px] border-gray-400 rounded-md my-1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button className="w-full mt-3 text-xl bg-violet-600 text-white p-2 rounded-lg cursor-pointer">
                Sign Up
              </button>
            </form>
          </div>
          <div className="text-center my-1">
            Aldready have an account?
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
