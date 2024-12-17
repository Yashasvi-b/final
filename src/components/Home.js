
import React, { useState, useEffect, useRef } from "react";
import VideoSlide from "./VideoSlide";
import ContentSlide from "./ContentSlide";
 // Import Link properly
import Footer from "./Footer";
import "../App.css";
import { Link } from "react-router-dom";

function Home({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReadMore, setShowReadMore] = useState(false);
  const readMoreRef = useRef(null); // Reference for the "Read More" section

  const videos = ["1.mp4", "2.mp4", "5.mp4", "4.mp4", "3.mp4"];
  const contents = [
    { title: "Mindfulness.", text: "positive psychology" },
    { title: "Therapy.", text: "Find yourself again" },
    { title: "Self Care", text: "Take a walk..." },
    { title: "Journal", text: "Write what you feel" },
    { title: "Detox", text: "Relax" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [videos.length]);

  const handleReadMoreClick = () => {
    setShowReadMore(true);
    setTimeout(() => {
      readMoreRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to "Read More"
    }, 100);
  };

  return (
    <div className={`home-container ${showReadMore ? "scrollable" : ""}`}>
      <section className="home">
        {videos.map((src, index) => (
          <VideoSlide key={index} src={src} isActive={index === activeIndex} />
        ))}

        {contents.map((content, index) => (
          <ContentSlide
            key={index}
            content={content}
            isActive={index === activeIndex}
            onReadMoreClick={handleReadMoreClick}
          />
        ))}

        <div className="slider-navigation">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`nav-btn ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </section>

      

      {showReadMore && (
      

<section id="services"  ref={readMoreRef}>
            <h2>Our Services</h2>
            <div class="service-container">
                <div class="service-box">
                    <h3>Self Care</h3>
                    <p>Take up challenges to keep yourself active</p>
                    <Link to="/selfCare">
        <button className="view-tests-btn">View Challenges</button>
      </Link>
                </div>
                <div class="service-box">
                    <h3>Journal</h3>
                    <p>Journal away your feelings</p>
                    <Link to="/journalPage">
        <button className="view-tests-btn">View Journal</button>
      </Link>
                </div>
                <div class="service-box">
                    <h3>Connect</h3>
                    <p>Connect to psychologists to get help</p>
                    <Link to="/calendar">
        <button className="view-tests-btn">View Calendar</button>
      </Link>
                </div>
                <div class="service-box">
                    <h3>Progress</h3>
                    <p>See your progress</p>
                    <Link to="/calendar">
        <button className="view-tests-btn">View Calendar</button>
      </Link>
                </div>
                <div class="service-box">
                    <h3>Daily Check-in</h3>
                    <p>Write your daily tasks</p>
                    
                    <Link to="/calendar">
        <button className="view-tests-btn">View Calendar</button>
      </Link>
                </div>
                <div class="service-box">
                    <h3>SOS Button</h3>
                    <p>Send message to your emergency contacts</p>
                    <Link to="/sos">
        <button className="view-tests-btn">View Calendar</button>
      </Link>
                </div>
                
            </div>
        </section>

        


      )}
   
   <Footer/>
      
    </div>
    
    
  );
}

export default Home;
