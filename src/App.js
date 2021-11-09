import "./App.css";
import { auth } from "./firebase/firebase_utils";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error";
import { useEffect } from "react";

import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const data = localStorage.getItem("result");

  useEffect(() => {
    if (data) {
      navigate("/Notes");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
