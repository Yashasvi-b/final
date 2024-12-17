// import React, { useState } from "react";

// const MoodInput = () => {
//   const [input, setInput] = useState("");  // Store user input
//   const [songs, setSongs] = useState([]);  // Store recommended songs
//   const [sentiment, setSentiment] = useState("");  // Store sentiment from backend
//   const [message, setMessage] = useState("");  // Store error message or feedback
//   const [loading, setLoading] = useState(false); // State to track loading status
//   const [currentIndex, setCurrentIndex] = useState(0); // Track the current set of 4 videos

//   // Handle changes in the input textarea
//   const handleInputChange = (e) => {
//     setInput(e.target.value);  // Update the input state with new content
//   };

//   const handleGetRecommendations = async () => {
//     setMessage("");  // Clear previous messages
//     setSongs([]);  // Clear recommendations
//     setLoading(true);  // Show the loading spinner when the request starts

//     try {
//       const response = await fetch("http://localhost:5002/api/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sentence: input }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch recommendations.");
//       }

//       const data = await response.json();
//       setSongs(data.recommended_songs);  // Store recommended songs
//       setSentiment(data.sentiment);  // Store sentiment from backend
//     } catch (error) {
//       setMessage("An error occurred while fetching recommendations.");
//     } finally {
//       setLoading(false);  // Hide the loading spinner once the request is finished
//     }
//   };

//   // Function to go to the next set of videos
//   const nextSet = () => {
//     if (currentIndex + 4 < songs.length) {
//       setCurrentIndex(currentIndex + 4);
//     }
//   };

//   // Function to go to the previous set of videos
//   const prevSet = () => {
//     if (currentIndex - 4 >= 0) {
//       setCurrentIndex(currentIndex - 4);
//     }
//   };

//   return (
//     <div className="Mood-page"  style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "linear-gradient(to bottom, #008080, #ffffff)", // Coral to White gradient
//       padding: "20px",
//       boxSizing: "border-box", // Ensure padding doesn't affect height
//     }} >
//     <div style={{
//       fontFamily: 'Arial', 
//       padding: '20px', 
//       border: '2px solid #ddd', 
//       width: '80%', 
//       minHeight: '600px', 
//       margin: '5% auto', 
//       borderRadius: '10px', 
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
//       backgroundColor: '#fff',
//       transition: 'transform 0.3s ease', 
//       position: 'relative'
//     }}>
//       <h1 style={{ textAlign: "center" }}>Describe Your Day</h1>

//       {/* Textarea for user input */}
//       <textarea
//         value={input}
//         onChange={handleInputChange}
//         placeholder="How are you feeling today?"
//         rows={4}
//         cols={50}
//         style={{
//           width: '100%', 
//           padding: '15px', 
//           marginBottom: '20px', 
//           borderRadius: '5px', 
//           border: '1px solid #ccc', 
//           fontSize: '16px', 
//           boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
//         }}
//       ></textarea>
//       <br />

//       {/* Button to Get Recommendations */}
//       <button
//         onClick={handleGetRecommendations}
//         style={{
//           padding: '12px 20px', 
//           fontSize: '16px', 
//           backgroundColor: '#008080', 
//           color: 'white', 
//           border: 'none', 
//           borderRadius: '5px', 
//           cursor: 'pointer', 
//           transition: 'background-color 0.3s ease'
//         }}
//       >
//         Get Recommendations
//       </button>

//       {/* Displaying the Sentiment */}
//       {sentiment && <h2 style={{ textAlign: "center", fontSize: "18px", color: "#333" }}>Don't worry we got YOU!!</h2>}

//       {/* Displaying Messages */}
//       {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}

//       {/* Loading Spinner */}
//       {loading && (
//         <div style={{ textAlign: "center" }}>
//           <img src="https://i.gifer.com/4V0b.gif" alt="Loading..." style={{ width: "50px", height: "50px" }} />
//         </div>
//       )}

//       {/* Displaying Recommended Songs */}
//       {songs && songs.length > 0 ? (
//         <div style={{
//           display: 'flex', 
//           justifyContent: 'center', 
//           flexWrap: 'wrap', 
//           gap: '15px', 
//           marginTop: '20px'
//         }}>
//           {songs.slice(currentIndex, currentIndex + 4).map((song, index) => {  // Display 4 videos at a time
//             const videoId = song.youtube_link.split("v=")[1];
//             return (
//               <div key={index} style={{
//                 backgroundColor: '#f9f9f9', 
//                 border: '1px solid #ccc', 
//                 padding: '15px', 
//                 margin: '5px', 
//                 textAlign: 'center', 
//                 width: '250px', 
//                 height: '180px', 
//                 display: 'inline-block', 
//                 borderRadius: '5px', 
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 overflow: 'hidden', 
//                 position: 'relative'
//               }}>
//                 <iframe 
//                   src={`https://www.youtube.com/embed/${videoId}`} 
//                   style={{
//                     width: '100%', 
//                     height: '100%', 
//                     border: 'none', 
//                     borderRadius: '5px', 
//                     backgroundColor: '#f0f0f0'
//                   }} 
//                   title={song.track_name}
//                 ></iframe>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p style={{ textAlign: "center" }}>{songs.length === 0 ? "" : ""}</p> 
//       )}

//       {/* Arrow Navigation */}
//       {songs.length > 4 && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button 
//             onClick={prevSet} 
//             style={{
//               padding: '10px 20px', 
//               margin: '0 10px', 
//               backgroundColor: '#b38add', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: '5px', 
//               cursor: 'pointer'
//             }}
//             disabled={currentIndex === 0}
//           >
//             &lt; Previous
//           </button>
//           <button 
//             onClick={nextSet} 
//             style={{
//               padding: '10px 20px', 
//               margin: '0 10px', 
//               backgroundColor: '#b38add', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: '5px', 
//               cursor: 'pointer'
//             }}
//             disabled={currentIndex + 4 >= songs.length}
//           >
//             Next &gt;
//           </button>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default MoodInput;
import React, { useState } from "react";

const MoodInput = () => {
  const [input, setInput] = useState(""); // Store user input
  const [songs, setSongs] = useState([]); // Store recommended songs
  const [sentiment, setSentiment] = useState(""); // Store sentiment from backend
  const [message, setMessage] = useState(""); // Store error message or feedback
  const [loading, setLoading] = useState(false); // State to track loading status
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current set of 4 videos
  const [activeTab, setActiveTab] = useState("songs"); // Active tab: "songs" or "meditation"

  // Static Meditation Videos categorized by mood
  const meditationVideos = {
    sad: ["https://www.youtube.com/embed/HM7oTRPwtUQ", "https://www.youtube.com/embed/PBI6XZt4VDg","https://www.youtube.com/embed/ki2NOFTw5-c","https://www.youtube.com/embed/V4SR4I25jlc"],
    happy: ["https://www.youtube.com/embed/62yWpuNrSgI", "https://www.youtube.com/embed/YRJ6xoiRcpQ","https://www.youtube.com/embed/94IFuiy8TPM","https://www.youtube.com/embed/TaqjzL4Fi6Y"],
    angry: ["https://www.youtube.com/embed/HSXcZmUN0OQ", "https://www.youtube.com/embed/TQDefR0KsHY","https://www.youtube.com/embed/wkse4PPxkk4","https://www.youtube.com/embed/MDqsn2oiYig"],
    anxious: ["https://www.youtube.com/embed/LBEAJcp0lTs", "https://www.youtube.com/embed/YzRUEmqDJd8","https://www.youtube.com/embed/6arfMc9Aj4k","https://www.youtube.com/embed/O-6f5wQXSu8"],
    stressed: ["https://www.youtube.com/embed/H_uc-uQ3Nkc", "https://www.youtube.com/embed/7Iei4-DDY7o","https://www.youtube.com/embed/9yj8mBfHlMk","https://www.youtube.com/embed/tuPW7oOudVc"],
    default: ["https://www.youtube.com/embed/inpok4MKVLM", "https://www.youtube.com/embed/U9YKY7fdwyg","https://www.youtube.com/embed/ijfLsKg8jFY","https://www.youtube.com/embed/goyZbut_KFY"],
  };

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input text
  };

  const handleGetRecommendations = async () => {
    setMessage("");
    setSongs([]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: input }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendations.");

      const data = await response.json();
      setSongs(data.recommended_songs);
      setSentiment(data.sentiment);
    } catch (error) {
      setMessage("An error occurred while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // Get meditation videos based on user input
  const getMeditationVideos = () => {
    const lowerInput = input.toLowerCase(); // Normalize input to lowercase
  
    if (["sad", "sadness", "low", "empty"].some((word) => lowerInput.includes(word))) {
      return meditationVideos.sad;
    }
    if (["happy", "happiness", "content","great"].some((word) => lowerInput.includes(word))) {
      return meditationVideos.happy;
    }
    if (["angry", "anger", "angrily"].some((word) => lowerInput.includes(word))) {
      return meditationVideos.angry;
    }
    if (["anxious", "anxiety"].some((word) => lowerInput.includes(word))) {
      return meditationVideos.anxious;
    }
    if (["stress", "stressed"].some((word) => lowerInput.includes(word))) {
      return meditationVideos.stressed;
    }
    return meditationVideos.default;
  };
  

  const nextSet = () => currentIndex + 4 < songs.length && setCurrentIndex(currentIndex + 4);
  const prevSet = () => currentIndex - 4 >= 0 && setCurrentIndex(currentIndex - 4);

  return (
    <div
      className="Mood-page"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #008080, #d0ffff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          fontFamily: "Arial",
          padding: "20px",
          border: "2px solid #ddd",
          width: "80%",
          minHeight: "600px",
          margin: "5% auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <h1 style={{ textAlign: "center" ,color:"#008C8C"}}>Describe Your Day</h1>

        {/* Textarea for user input */}
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="How are you feeling today?"
          rows={4}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        ></textarea>
        <br />

        {/* Button to Get Recommendations */}
        <button
          onClick={handleGetRecommendations}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#008080",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Recommendations
        </button>

        {/* Tabs: Meditation and Songs */}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <button
            onClick={() => setActiveTab("meditation")}
            style={{
              backgroundColor: activeTab === "meditation" ? "#008080" : "#ccc",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Meditation
          </button>
          <button
            onClick={() => setActiveTab("songs")}
            style={{
              backgroundColor: activeTab === "songs" ? "#008080" : "#b4b4b4",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Songs
          </button>
        </div>

        {/* Meditation Videos */}
        {activeTab === "meditation" && (
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
            {getMeditationVideos().map((videoUrl, index) => (
              <div key={index} style={{ width: "250px", height: "180px" }}>
                <iframe
                  src={videoUrl}
                  title={`Meditation Video ${index + 1}`}
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                  allow="fullscreen"
                ></iframe>
              </div>
            ))}
          </div>
        )}

        {/* Songs Section */}
        {activeTab === "songs" && songs.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
            {songs.slice(currentIndex, currentIndex + 4).map((song, index) => {
              const videoId = song.youtube_link.split("v=")[1];
              return (
                <div key={index} style={{ width: "250px", height: "180px" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={song.track_name}
                    style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                    allow="fullscreen"
                  ></iframe>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodInput;
