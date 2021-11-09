import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import YoutubeDoc from "./YoutubeDoc";
import db from "../../firebase/firebase_utils";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap');
</style>;

function YoutubeMenu() {
  const data = localStorage.getItem("result");
  let user_data = JSON.parse(data);
  const [Playlist, setPlaylist] = useState("");
  const handletextchange = (e) => {
    let selectedFile = e.target.value;
    setPlaylist(selectedFile);
    console.log(Playlist);
  };
  const uploadbutton = () => {
    db.collection("Notebooks")
      .doc(user_data.user.uid)
      .set({ Playlist: Playlist })
      .then(function () {
        console.log("Playlist Update");
        window.location.reload();
      });
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <div>
          <header class="menu__header">
            <span class="menu__title">Youtube</span>
            <hr />
          </header>
          <div className="menu__content">
            {/* <form className="form-group" onSubmit={handlePdfFileSubmit}>
              </form> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="name@example.com"
              onChange={handletextchange}
            />
            <br></br>
          </div>
        </div>
        <footer className="menu__footer">
          <Button onClick={uploadbutton} className="btn" variant="dark">
            Add Playlist
          </Button>{" "}
        </footer>
      </div>
      <div className="menu__doc__container">
        <YoutubeDoc />
      </div>
    </div>
  );
}

export default YoutubeMenu;
