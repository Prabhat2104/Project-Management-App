import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import { useSelector,useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;
  //const {register, authUser, setAuthUser} = useContext(AuthContext);
  const {authUser} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Dummy submit (replace with API call)
    console.log("Registering user:", formData);

    // Example validation
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    // Reset form (optional)
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    try {
      dispatch(registerUser({ name, email, password }));
      //if (authUser!==null) {
        navigate("/");
        //setIsAdmin(JSON.parse(localStorage.getItem("user")).isAdmin);
        //setAuthUser(JSON.parse(localStorage.getItem("user")));
        
      //}
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border shadow-gray-800">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account ✨
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="Enter Your Email"
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full cursor-pointer border rounded-lg hover:ring-blue-500 hover:ring-1 background-blue-200"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
