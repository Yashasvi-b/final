import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Stories.css";

const StoriesPage = () => {
  const [stories, setStories] = useState([]); // Fetched stories
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [issue, setIssue] = useState("placementStress"); // Selected issue
  const [text, setText] = useState(""); // Story text input
  const [isSafe, setIsSafe] = useState(true); // Flag for content safety
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [loggedInEmail, setLoggedInEmail] = useState("Anonymous"); // Replace with actual logged-in email
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 10;


  const fetchStories = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken"); // Fetch the token from localStorage
  
      const response = await axios.get("http://localhost:5002/api/stories", {
        params: { issue },
        headers: { Authorization: `Bearer ${token}` }, // Include the token in Authorization header
      });
  
      const sortedStories = response.data.sort((a, b) => b.likes - a.likes);
      setStories(sortedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      alert("Error fetching stories. Please log in again.");
    }
  }, [issue]);
  

  useEffect(() => {
    fetchStories();
  }, [issue, fetchStories]);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);


  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  // Analyze story content
  const analyzeStory = async (content) => {
    try {
      const response = await axios.post("http://localhost:5002/api/analyze-story", { content });
      if (response.data.prediction === "Potential Suicide Post") {
        setIsSafe(false);
        setErrorMessage("Warning: This story may contain sensitive content and cannot be shared.");
        alert("Warning: This story contains sensitive content and cannot be shared.");
        setText("");
        return false;
      }
      setIsSafe(true);
      setErrorMessage("");
      return true;
    } catch (error) {
      console.error("Error analyzing story:", error);
      setErrorMessage("Error analyzing the story content.");
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Submit story form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isContentSafe = await analyzeStory(text);
    if (!isContentSafe) return;

    try {
      await axios.post("http://localhost:5002/api/submit-story", {
        email: loggedInEmail, // Use the actual logged-in email dynamically
        age: 22, // Replace dynamically if needed
        gender: "Male", // Replace dynamically if needed
        issue,
        content: text,
      });

      alert("Story submitted successfully!");
      setText("");
      setShowForm(false);
      fetchStories(); // Refresh stories to include the new one
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("Error submitting story.");
    } finally {
      setLoading(false);
    }
  };


  const handleLike = async (storyId) => {
    try {
      // Optimistically update likes count immediately on the UI
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, likes: story.likes + 1 } : story
        )
      );
  
      // Send like request to backend
      const response = await axios.post(`http://localhost:5002/api/stories/${storyId}/like`);
      if (response.status === 200) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === storyId ? { ...story, likes: response.data.likes } : story
          )
        );
      }
    } catch (error) {
      console.error("Error liking story:", error);
      alert("Error liking story. Please try again.");
      // Revert like update if API call fails
      fetchStories();
    }
  };
  

return (
  <div className="stories-page">
    <h1 className="page-title" style={{ textAlign: "center", color: "rgb(0 98 197)", marginTop: "3%" }}>
      You're not alone
    </h1>

    {/* Issue Filter */}
    <div className="filter-section">
      <label>
        Select Issue:
        <select value={issue} onChange={(e) => setIssue(e.target.value)}>
          <option value="placementStress">Placement Stress</option>
          <option value="inferiorityComplex">Inferiority Complex</option>
          <option value="socialAnxiety">Social Anxiety</option>
          <option value="loneliness">Loneliness</option>
          <option value="sexualOrientation">Sexual Orientation</option>
          <option value="academicPressure">Academic Pressure</option>
          <option value="relationshipIssues">Relationship Issues</option>
          <option value="bullying">Bullying</option>
        </select>
      </label>
    </div>

    {/* Share Story Button */}
    <button onClick={() => setShowForm(!showForm)} className="add-story-button">
      Share Your Story
    </button>

    {/* Form to Submit Story */}
    {showForm ? (
      <div className="story-form">
        <h2>Share Your Success Story</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={handleInputChange}
            rows="4"
            placeholder="Write your story here..."
            required
          ></textarea>
          <button type="submit" disabled={!isSafe || loading}>
            {loading ? "Submitting..." : "Submit Story"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    ) : (
      // Display Stories
      <div className="stories-container">
        {currentStories.length > 0 ? (
          currentStories.map((story) => (
            <div
              key={story._id}
              className="story-card"
              onClick={() => handleStoryClick(story)} // Open modal when clicking the card
              style={{ cursor: "pointer" }}
            >
              <div className="story-header">
                <img src="/images/chatbot/user.png" alt="bot" className="profile-pic" />
                <p className="story-meta">Anonymous</p>
              </div>

              <p className="story-text">{story.content}</p>

              <div className="story-footer">
                <span
                  className="likes-count"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents modal when clicking the heart
                    handleLike(story._id); // Trigger like functionality
                  }}
                  style={{ cursor: "pointer" }}
                >
                  ❤️ {story.likes}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-stories">
            No stories available for the selected issue. Be the first to share your journey!
          </p>
        )}
      </div>
    )}

    {/* Pagination */}
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={indexOfLastStory >= stories.length}>
        Next
      </button>
    </div>

    {/* Story Modal */}
    {selectedStory && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <h3>Full Story</h3>
          <p>{selectedStory.content}</p>
        </div>
      </div>
    )}
  </div>
);
};
export default StoriesPage;