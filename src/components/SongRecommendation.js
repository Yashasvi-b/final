import React from "react";
import YouTubePlayer from "./YouTubePlayer"; // import YouTubePlayer component

const SongRecommendation = ({ song }) => {
  // Extract video ID from YouTube link (assuming the format is "https://www.youtube.com/watch?v=videoId")
  const videoId = song.youtube_link.split("v=")[1];

  return (
    <div>
      <h3>{song.track_name} by {song.artists}</h3>
      {/* Embed YouTube Player */}
      {videoId && <YouTubePlayer videoId={videoId} />}
    </div>
  );
};

export default SongRecommendation;
