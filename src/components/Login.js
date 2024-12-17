// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "./LoginPage.css";


// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate(); // Hook for navigation

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       // Send login request
// //       const response = await axios.post(
// //         "http://localhost:5002/api/login",
// //         { email, pd: password }, // Backend expects `pd` for password
// //         { withCredentials: true } // Include cookies in the request
// //       );

// //       // Store email in localStorage
// //       localStorage.setItem("email", response.data.email);
// //       console.log("Email stored in localStorage:", response.data.email);

// //       // Show success message
// //       alert(response.data.message);

// //       // Redirect to the home page if login is successful
// //       if (response.data.message === "Login successful") {
// //         navigate("/home");
// //       }
// //     } catch (error) {
// //       // Handle errors
// //       console.error("Login failed:", error.response?.data?.message || error.message);
// //       alert(error.response?.data?.message || "Something went wrong");
// //     }
// //   };

// //   // return (
// //   //   <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
// //   //     <h2>Login</h2>
// //   //     <form onSubmit={handleSubmit}>
// //   //       <div>
// //   //         <label>Email</label>
// //   //         <input
// //   //           type="email"
// //   //           value={email}
// //   //           onChange={(e) => setEmail(e.target.value)}
// //   //           required
// //   //         />
// //   //       </div>
// //   //       <div>
// //   //         <label>Password</label>
// //   //         <input
// //   //           type="password"
// //   //           value={password}
// //   //           onChange={(e) => setPassword(e.target.value)}
// //   //           required
// //   //         />
// //   //       </div>
// //   //       <button type="submit">Login</button>
// //   //     </form>
// //   //   </div>
// //   // );
// //   return (
// //     <div className="container">
  
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Email</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Password</label>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
  
// // };

// // export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send login request
//       const response = await axios.post(
//         "http://localhost:5002/api/login",
//         { email, pd: password }, // Backend expects `pd` for password
//         { withCredentials: true } // Include cookies in the request
//       );

//       // Store email in localStorage
//       localStorage.setItem("email", response.data.email);
//       console.log("Email stored in localStorage:", response.data.email);

//       // Show success message
//       alert(response.data.message);

//       // Redirect to the home page if login is successful
//       if (response.data.message === "Login successful") {
//         navigate("/home");
//       }
//     } catch (error) {
//       // Handle errors
//       console.error("Login failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const containerStyle = {
//     marginTop:"70px",
//     background: "#ffffff",
//     color: "#3f51b5",
//     height: "500px",
//     width: "400px",
//     padding: "20px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "auto",
//   };

//   const formStyle = {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   };

//   const labelStyle = {
//     fontSize: "0.9rem",
//     color: "#1a237e",
//     fontWeight: "bold",
//     marginTop:"20px",
//     marginBottom: "5px",
//     textTransform: "uppercase",
//   };

//   const inputStyle = {
//     padding: "10px",
//     fontSize: "1rem",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     outline: "none",
//     transition: "0.3s",
//   };

//   const inputFocusStyle = {
//     borderColor: "#3f51b5",
//     boxShadow: "0 0 3px #3f51b5",
//   };

//   const buttonStyle = {
//     padding: "10px 15px",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     color: "#ffffff",
//     backgroundColor: "#3f51b5",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     transition: "0.3s",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#1a237e",
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={{ textAlign: "center", fontSize: "1.8rem", color: "#1a237e", marginBottom: "20px" }}>
//         Login
//       </h2>
//       <form
//         style={formStyle}
//         onSubmit={handleSubmit}
//       >
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={labelStyle}>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={inputStyle}
//             onFocus={(e) => (e.target.style = { ...inputStyle, ...inputFocusStyle })}
//             onBlur={(e) => (e.target.style = { ...inputStyle })}
//           />
//         </div>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={labelStyle}>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//             onFocus={(e) => (e.target.style = { ...inputStyle, ...inputFocusStyle })}
//             onBlur={(e) => (e.target.style = { ...inputStyle })}
//           />
//         </div>
//         <button
//           type="submit"
//           style={buttonStyle}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#1a237e")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#3f51b5")}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send login request
//       const response = await axios.post(
//         "http://localhost:5002/api/login",
//         { email, pd: password }, // Backend expects `pd` for password
//         { withCredentials: true } // Include cookies in the request
//       );

//       // Store email in localStorage
//       localStorage.setItem("email", response.data.email);
//       console.log("Email stored in localStorage:", response.data.email);

//       // Show success message
//       alert(response.data.message);

//       // Redirect to the home page if login is successful
//       if (response.data.message === "Login successful") {
//         navigate("/home");
//       }
//     } catch (error) {
//       // Handle errors
//       console.error("Login failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const pageStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh", // Full height of the viewport
  
//     margin: "0",
//   };

//   const containerStyle = {
//     background: "#ffffff",
//     color: "#3f51b5",
//     height: "400px",
//     width: "400px",
//     padding: "20px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   const formStyle = {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   };

//   const labelStyle = {
//     fontSize: "0.9rem",
//     color: "#1a237e",
//     fontWeight: "bold",
//     marginBottom: "5px",
//     textTransform: "uppercase",
//   };

//   const inputStyle = {
//     padding: "10px",
//     fontSize: "1rem",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     outline: "none",
//     transition: "0.3s",
//   };

//   const buttonStyle = {
//     padding: "10px 15px",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     color: "#ffffff",
//     backgroundColor: "#b38add",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     transition: "0.3s",
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={containerStyle}>
//         <h2
//           style={{
//             textAlign: "center",
//             fontSize: "1.8rem",
//             color: "#1a237e",
//             marginBottom: "20px",
//           }}
//         >
//           Login
//         </h2>
//         <form style={formStyle} onSubmit={handleSubmit}>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <label style={labelStyle}>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <label style={labelStyle}>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={inputStyle}
//             />
//           </div>
//           <button type="submit" style={buttonStyle}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:5002/api/login",
        { email, pd: password }, // `pd` is password expected in the backend
        { withCredentials: true } // Include cookies for authentication
      );

      // Store token in localStorage
      localStorage.setItem("authToken", response.data.token);
      alert(response.data.message || "Login successful!");

      // Redirect to home page
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Page styling
  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: "0",
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
    textTransform: "uppercase",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "0.3s",
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
    transition: "0.3s",
  };

  const buttonLoadingStyle = {
    ...buttonStyle,
    backgroundColor: "#d0b0f5",
    cursor: "not-allowed",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", color: "#1a237e", marginBottom: "20px" }}>
          Login
        </h2>
        <form style={formStyle} onSubmit={handleLogin}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={loading ? buttonLoadingStyle : buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
  <span style={{ color: "#3f51b5" }}>New user? </span>
  <a
    href="/signup"
    style={{
      color: "#b38add",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    Create account
  </a>
</div>

        </form>
      </div>
    </div>
  );
};

export default Login;
