import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import { useSelector,useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  //const {login, authUser,setIsAdmin, setAuthUser} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dummy login (replace with API call)
    console.log("Logging in with:", formData);

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
        //const success = await login({ email, password });
        const success = dispatch(loginUser({ email, password }));
        if (success) {
          
          navigate("/");
          // console.log(JSON.parse(localStorage.getItem("user")).isAdmin);
          //setIsAdmin(JSON.parse(localStorage.getItem("user")).isAdmin);
          //setAuthUser(JSON.parse(localStorage.getItem("user")));
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border shadow-gray-800">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-200 text-black border py-2 rounded-lg cursor-pointer hover:ring-black-500 hover:ring-1"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
