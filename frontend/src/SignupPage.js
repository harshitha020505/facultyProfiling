import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("faculty"); // Default to faculty signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState(""); // Added department field
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prevent signup if faculty and department is empty
    if (userType === "faculty" && !department.trim()) {
      alert("Please enter your department.");
      setLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: userType, // Either "faculty" or "authority"
      ...(userType === "faculty" && { department }), // Include department only if faculty
    };

    try {
      const response = await fetch("http://localhost:5000/api/faculty/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Redirecting...");
        navigate("/"); // Redirect to the homepage or dashboard
      } else {
        alert(`Signup failed: ${data.error || "Unknown error"}`); // Fix error message handling
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <div className="user-type-toggle">
        <button
          className={userType === "faculty" ? "active" : ""}
          onClick={() => setUserType("faculty")}
        >
          Faculty Signup
        </button>
        <button
          className={userType === "authority" ? "active" : ""}
          onClick={() => setUserType("authority")}
        >
          Higher Authority Signup
        </button>
      </div>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Show department input only for Faculty */}
        {userType === "faculty" && (
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              placeholder="Enter your department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : `Sign Up as ${userType === "faculty" ? "Faculty" : "Higher Authority"}`}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
