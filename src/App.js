// // import React from "react";
// // import Header from "./components/Header";
// // import Home from "./components/Home";
// // import "./App.css";

// // function App() {
// //   return (
// //     <div className="App">
// //       <Header />
// //       <Home />
// //     </div>
// //   );
// // }

// // export default App;
// import React from "react"; // Only one React import is necessary
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./components/Home";
// import Calendar from "./components/Calendar"; // Ensure this is imported
// import "./App.css";
// import { SelfCare } from "./components/SelfCare";
// import MoodInput from "./components/MoodInput";
// import ProgressPage from "./components/progress";
// import JournalPage from "./components/JournalPage";
// import SOSPage from "./components/SOSPage";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import ChatbotComponent from "./components/ChatBot";
// import Stories from "./components/Stories";





// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//         <Route path="/" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/selfCare" element={<SelfCare />} />
//           <Route path="/moodInput" element={<MoodInput />} />
//           <Route path="/progressPage" element={<ProgressPage />} />
//           <Route path="/journalPage" element={<JournalPage />} />
//           <Route path="/sos" element={<SOSPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/stories" element={<Stories />} />
//           <Route path="/Chatbot" element={<ChatbotComponent />} />
          
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { SelfCare } from "./components/SelfCare";
import MoodInput from "./components/MoodInput";
import ProgressPage from "./components/progress";
import JournalPage from "./components/JournalPage";
import SOSPage from "./components/SOSPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatbotComponent from "./components/ChatBot";
import Stories from "./components/Stories";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import Psychologist from "./components/Psychologist";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/selfCare"
            element={
              <PrivateRoute>
                <SelfCare />
              </PrivateRoute>
            }
          />
          <Route
            path="/moodInput"
            element={
              <PrivateRoute>
                <MoodInput />
              </PrivateRoute>
            }
          />
          <Route
            path="/progressPage"
            element={
              <PrivateRoute>
                <ProgressPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/journalPage"
            element={
              <PrivateRoute>
                <JournalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sos"
            element={
              <PrivateRoute>
                <SOSPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <PrivateRoute>
                <Stories />
              </PrivateRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <PrivateRoute>
                <ChatbotComponent />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/psychologists"
            element={
              <PrivateRoute>
                <Psychologist />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<useNavigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
