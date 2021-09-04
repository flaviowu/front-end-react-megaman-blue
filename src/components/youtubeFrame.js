import React from "react";
import "./Style/youtubeFrame.css";

export default function iFrameYouTube(props) {
  const getId = (url) => url.split('=')[1]
  
  return (
    <iframe
      width="230"
      src={`https://www.youtube.com/embed/${getId(props.youtubeId)}`}
      title="YouTube video player"
    ></iframe>
  );
}
