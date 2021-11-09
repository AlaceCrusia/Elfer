import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NoteCard.css";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

function NoteCard({ title, id, file }) {
  const navigate = useNavigate();
  const log = () => {
    navigate(`/Notes/${id}/${title}/${file}`);
    console.log(file);
  };
  return (
    <div onClick={(e) => log()} className="Parent__Card">
      <Card>
        <Card.Body fontSize="small">{title}</Card.Body>
      </Card>
    </div>
  );
}

export default NoteCard;
