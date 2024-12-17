import React from "react";

function VideoSlide({ src, isActive }) {
  return (
    <video
      className={`video-slide ${isActive ? "active" : ""}`}
      src={src}
      autoPlay
      muted
      loop
    ></video>
  );
}

export default VideoSlide;
