import React, { useState,useEffect } from "react";
import "./Self.css";
import axios from "axios";

import CalendarHeader from "./CalendarHeader";

export const SelfCare = () => {
  const [calendarData, setCalendarData] = useState({}); 
  const [progress, setProgress] = useState(0);
  const handleStatusChange = async (day) => {
    const email = localStorage.getItem('email');
    if (!email) {
        alert('User not logged in');
        return;
    }

    setCalendarData((prevData) => {
        const updatedData = {
            ...prevData,
            [day]: { status: !prevData[day]?.status },
        };

        const completedCount = Object.values(updatedData).filter((d) => d.status).length;
        const progressPercentage = (completedCount / 21) * 100;
        setProgress(progressPercentage);

        axios
        .post(
            "http://localhost:5002/api/save-progress",
            { tasks: updatedData },
            { withCredentials: true }
        )
        .then(() => console.log("Progress saved"))
        .catch((error) => console.error("Error saving progress:", error));
    

        return updatedData;
    });
};

useEffect(() => {
  
  const email = localStorage.getItem("email");
    console.log("Email from localStorage:", email);
  if (!email) {
    alert('User not logged in');
    return;
  }

  axios
  .get("http://localhost:5002/api/get-progress", { withCredentials: true })
  .then((response) => {
    console.log("Fetched tasks:", response.data.tasks);
    setCalendarData(response.data.tasks || {});

  const completedCount = Object.values(response.data.tasks || {}).filter(
    (d) => d.status
  ).length;
  setProgress((completedCount / 21) * 100); // Calculate progress percentage
})
.catch((error) => console.error("Error fetching progress:", error));


}, []);
  
  // Using relative paths from the public director 
  const basePath = '/images/selfcare';
  const imagePaths = [
    `${basePath}/image1.png`,
    `${basePath}/image2.png`,
    `${basePath}/image3.png`,
    `${basePath}/image4.png`,
    `${basePath}/image5.png`,
    `${basePath}/image6.png`,
    `${basePath}/image7.png`,
    `${basePath}/image8.png`,
    `${basePath}/image9.png`,
    `${basePath}/image10.png`,
    `${basePath}/image11.png`,
    `${basePath}/image12.png`,
    `${basePath}/image13.png`,
    `${basePath}/image14.png`,
    `${basePath}/image15.png`,
    `${basePath}/image16.png`,
    `${basePath}/image17.png`,
    `${basePath}/image18.png`,
    `${basePath}/image19.png`,
    `${basePath}/image20.png`,
    `${basePath}/image21.png`,
  ];

  const contentArray = [
    "Day 1 Challenge: Practice Digital Detox",
    "Day 2 Challenge: Practice Self Compassion.",
    "Day 3 Challenge: Declutter a small area of your home.",
    "Day 4 Challenge: Take a 30-minute walk outdoors.",
    "Day 5 Challenge: Plan a self care day for yourself",
    "Day 6 Challenge: Try out new sports.",
    "Day 7 Challenge: Listen to your favorite music.",
    "Day 8 Challenge: Try a new healthy recipe.",
    "Day 9 Challenge: Catch up with your friends.",
    "Day 10 Challenge: Dance to your favorite songs.",
    "Day 11 Challenge: Eat your favorite food",
    "Day 12 Challenge: Make a new creative hobby.",
    "Day 13 Challenge: Do karoke.",
    "Day 14 Challenge: Do an activity that makes you laugh",
    "Day 15 Challenge: Take a relaxing bath.",
    "Day 16 Challenge: Read a book.",
    "Day 17 Challenge: Try a new hobby or skill.",
    "Day 18 Challenge: Start your day with a 10-minute meditation.",
    "Day 19 Challenge: Reflect on your personal goals.",
    "Day 20 Challenge: Have a relaxed skin-care evening.",
    "Day 21 Challenge: Write a journal",
  ];

  const renderCalendar = () => {
    const days = Array.from({ length: 21 }, (_, i) => i + 1);
    return days.map((day) => {
      const dateKey = day.toString();
      const dayData = calendarData[dateKey] || { status: false };
      const imageSrc = imagePaths[day - 1];
      const content = contentArray[day - 1];

      return (
        <div
          key={dateKey}
          className={`calendar-day ${dayData.status ? "completed" : ""}`}
        >
          <div className="day-content">
            <div className="card-front">
              <div className="date">{day}</div>
              <img
                src={imageSrc}
                alt={`Event Image for Day ${day}`}
                className="card-image"
              />
            </div>
            <div className="card-back">
              <p>{content}</p>
            </div>
          </div>

          <button
            onClick={() => handleStatusChange(dateKey)}
            className={`toggle-button ${dayData.status ? "completed" : ""}`}
          >
            {dayData.status ? "Completed" : "Take Challenge"}
          </button>
        </div>
      );
    });
  };



return (
  <div
    style={{
      minHeight: "100vh", // Full viewport height
      margin: "0", // Remove margins
      padding: "0", // Remove padding
      background: " linear-gradient(to bottom,#bc98e1, #ece2f7)", // Pink to White gradient
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif'",
    }}
  >
    <div className="self-care-container">
      <h1
        className="calendar-title"
        style={{
          marginTop:"50px",
          color:"white",
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif'",
          fontSize: "2rem",
          padding: "30px",
          marginBottom: "10px",
        }}
      >
        Self Care Challenges
      </h1>
      <CalendarHeader />

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${progress}%`,
              backgroundColor: "#4caf50",
              height: "100%",
            }}
          ></div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "5px",
            color: "white",
          }}
        >
          {Math.round(progress)}% Completed
        </p>
      </div>

      {/* Calendar Container */}
      <div className="calendar-container">{renderCalendar()}</div>
    </div>
  </div>
);

};