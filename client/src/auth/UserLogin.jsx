import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success("Login successfully")
        navigate("/dashboard")
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded shadow-lg w-96"
        onSubmit={loginUser}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 placeholder-gray-400 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="you@example.com"
            onChange={(e) =>
              setData((data) => ({
                ...data,
                email: e.target.value,
              }))
            }
            value={data.email}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 placeholder-gray-400 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="********"
            onChange={(e) =>
              setData((data) => ({
                ...data,
                password: e.target.value,
              }))
            }
            value={data.password}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 rounded hover:from-blue-600 hover:to-purple-600"
          type="submit"
        >
          Login
        </button>
        <p className="text-center font-bold mt-3">
          Don't have Account{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
