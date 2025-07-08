import { Link, useNavigate } from "react-router-dom";
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import Loading from "@/components/Loading";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, setData] = useState<FormData>({ email: "", password: "" });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(data).unwrap();
      console.log("🔍 Login API Response", response);
      const { data: responseData } = response;
      if (!responseData?.user) {
        console.error("❌ No user in response");
        return;
      }
      dispatch(setUser({ user: responseData.user }));
      navigate("/");
      alert("✅ Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div
      id="login"
      className="flex items-center justify-center min-h-screen p-4"
    >
      <NeonGradientCard className="w-full max-w-md bg-whitep-6 rounded-2xl shadow-lg">
        <div className="w-full max-w-md bg-background border-t-4 border-green-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          {/* login form section start */}
          <form onSubmit={handleSubmit} className="pt-4 flex flex-col gap-4">
            {/* email section */}
            <div className="">
              <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            {/* password section */}
            <div className="relative pb-6">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-full p-2 border rounded border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
              {/* show password icon */}
              <div className="cursor-pointer text-xl absolute top-9 right-3">
                <span>
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </span>
              </div>
            </div>
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer">
              Login
            </button>
          </form>
          {/* login form section end */}
          <p className="text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-red-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default Login;
