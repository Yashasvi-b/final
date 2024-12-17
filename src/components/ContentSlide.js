import React from "react";

function ContentSlide({ content, isActive, onReadMoreClick }) {
  return (
    <div className={`content ${isActive ? "active" : ""}`}>
      <h1>{content.title}</h1>
      <p>{content.text}</p>
      <a href="#" onClick={onReadMoreClick}>Read More</a> {/* Trigger the read more section */}
    </div>
  );
}

export default ContentSlide;
