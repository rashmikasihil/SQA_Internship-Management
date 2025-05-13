import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { userService } from "../services/userService";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(email, password);
      login(response.data);
      navigate("/intern-management");
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
<>
    
    <div
      className="login-container flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.leonardo.ai/users/1102112e-252c-44dc-8a88-0e54f3e2b24a/generations/ceb293a3-394b-4f06-bb5b-95f66d0fe378/Leonardo_Phoenix_09_abstract_background_using_this_theme_2.jpg')`,
      }}
    >
      <div className="login-box w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side: Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://cdn.leonardo.ai/users/102ca45a-7c57-44f4-8f5a-a8bc2ccaa236/generations/4b06b89e-5df8-43f2-bc5e-f925bc4af8b0/Leonardo_Phoenix_09_A_vibrant_and_modern_illustration_of_a_col_3.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-4xl font-bold text-dark-gray text-center mb-6">
            Welcome Back!
          </h2>
          <p className="text-center text-dark-gray text-sm mb-8">
            Please log in to access your dashboard.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark-gray"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 mt-1 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue bg-white text-dark-gray"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark-gray"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 mt-1 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue bg-white text-dark-gray"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-black text-white font-bold rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center text-sm">
            <a
              href="/forgot-password"
              className="text-teal hover:text-blue hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="/intern-register"
              className="text-teal hover:text-blue hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Login;
