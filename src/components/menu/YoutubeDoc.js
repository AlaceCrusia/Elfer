import React, { useEffect, useState } from "react";
import IframePage from "./IframePage";
import axios from "../../axios";
import "./YoutubeDoc.css";
import db from "../../firebase/firebase_utils";

function YoutubeDoc() {
  const [videos, setvideos] = useState([]);
  const [PlayUrl, setPlayUrl] = useState("");

  const data = localStorage.getItem("result");
  let user_data = JSON.parse(data);

  async function fetchData(url) {
    const request = await axios.get(url);
    setvideos(request.data.items);
    return request;
  }
  useEffect(() => {
    // let fetchUrl =
    //   "/playlistItems?part=snippet&maxResults=50&playlistId=PLu0W_9lII9agrsRZjFECeFuWY5ev2pQlk&fields=pageInfo%2C%20items%2Fsnippet%2C%20nextPageToken&key=AIzaSyDLezT2ulmLBF93EMRnKBRGBiddCh1zsz0";
    async function getDoc(id) {
      const snapshot = await db.collection("Notebooks").doc(id).get();
      const data = snapshot.data();
      setPlayUrl();
      let fetchUrl =
        "/playlistItems?part=snippet&maxResults=50&playlistId=" +
        data.Playlist +
        "&fields=pageInfo%2C%20items%2Fsnippet%2C%20nextPageToken&key=AIzaSyDLezT2ulmLBF93EMRnKBRGBiddCh1zsz0";
      fetchData(fetchUrl);
      console.log(PlayUrl);
      console.log(fetchUrl);
    }
    getDoc(user_data.user.uid);
  }, []);
  return (
    <div className="youtube__doc">
      {videos.map((video) => (
        <IframePage video_key={video.snippet.resourceId.videoId} />
      ))}
      {/* <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" />
      <IframePage video_key="bYT86PTx61k" /> */}
    </div>
  );
}

export default YoutubeDoc;
