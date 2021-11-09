import React from "react";
import "./IframePage.css";

function IframePage({ video_key }) {
  let _key = "https://www.youtube.com/embed/" + video_key;
  return (
    <div className="Iframe__container">
      <iframe
        allow="fullscreen;"
        width="560"
        height="315"
        src={_key}
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default IframePage;
