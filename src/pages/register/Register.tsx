/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useState } from "react";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";

type FormData = {
  username: string;
  email: string;
  password: string;
  birthdate: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration logic here
    try {
       await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        birthdate: new Date().toISOString(),
      }).unwrap();
      
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div
      id="register"
      className="flex items-center justify-center min-h-screen p-4"
    >
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-green-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* user name section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Enter your user name"
                className="w-full mt-1 p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            {/* email section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            {/* password section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full mt-1 p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
            </div>
            {/* birthdate section */}
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                name="birthdate"
                value={data.birthdate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default Register;
