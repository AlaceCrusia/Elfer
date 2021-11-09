import React, { useState, useEffect } from "react";
import db, { auth } from "../firebase/firebase_utils";
import Sidebar from "./sidebar/Sidebar";
import NoteMenu from "./menu/NoteMenu";
import ChatMenu from "./menu/ChatMenu";
import YoutubeMenu from "./menu/YoutubeMenu";
import Accounts from "./menu/Accounts";
import "./Home.css";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home">
      <Sidebar />

      <Routes>
        <Route path="/Notes/*" element={<NoteMenu />} />
        <Route path="/youtube/*" element={<YoutubeMenu />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/chat/*" element={<ChatMenu />} />
      </Routes>
    </div>
  );
};

export default Home;
