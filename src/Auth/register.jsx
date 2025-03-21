import { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
     const response =  await axios.post(`${apiUrl}/register`, formData);
     const data = await response.data
     console.log(data)
    navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins flex flex-col min-h-screen w-full bg-gradient-to-br from-violet-500 to-gray-200  items-center justify-center ">
      <div className="w-full mb-5 max-w-sm mt-5 max-md:w-11/12 shadow-md rounded bg-white p-6 ">
        <h2 className="mb-6 text-center text-2xl font-semibold font-kanit text-violet-600">
          Create an Account
        </h2>
        {error && <p className="mb-4 text-center font-bold text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
          <div> 
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-transparent p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
          
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-transparent p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-transparent p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
            
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-transparent p-2 text-text-color focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded  p-2 text-white bg-violet-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Signup"}
          </button>
        </form>

        <p className=" text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className=" hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
