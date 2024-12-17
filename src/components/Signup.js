// import React, { useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the backend signup API
//       const response = await axios.post("http://localhost:5002/api/signup", {
//         email,
//         pd: password,
//       });
      
//       alert(response.data.message); // Display success message
//       if (response.data.message === "Signup successful") {
//         // Redirect to Home page
//         Navigate("/home");
//       }
//     } catch (error) {
//       console.error("Signup Error:", error); // Log error
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  // Handle Signup Form Submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5002/api/signup", {
        email,
        pd: password, // Backend expects 'pd' as password
      });

      alert(response.data.message || "Signup successful!");
      if (response.data.message === "Signup successful") {
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #b38add, #ffffff)", // Gradient background
  };

  const containerStyle = {
    background: "#ffffff",
    color: "#3f51b5",
    height: "400px",
    width: "400px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const labelStyle = {
    fontSize: "0.9rem",
    color: "#1a237e",
    fontWeight: "bold",
    marginBottom: "5px",
    marginRight:"10px",
    textTransform: "uppercase",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#b38add",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", color: "#1a237e", marginBottom: "20px" }}>
          Signup
        </h2>
        <form style={formStyle} onSubmit={handleSignup}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
