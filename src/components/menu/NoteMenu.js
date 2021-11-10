import React, { useState, useEffect } from "react";
import db, { auth } from "../../firebase/firebase_utils";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import NoteCard from "./NoteCard";
import MenuDoc from "./MenuDoc";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Btn from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popup from "@mui/material/Modal";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

//Refrence Path
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

//-----------------------------------------------------------------------------------------------------------
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap');
</style>;
let selectedFile;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NoteMenu() {
  let book_url = "";
  // Notebook States
  const [notebook, setNotebook] = useState([]);
  const [book, setbook] = useState("Notebook");
  const [bookfield, setbookfield] = useState("");

  //Note states
  const [note, setNote] = useState([]);
  const [notename, setNotename] = useState([]);

  //Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for onchange event
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState([]);

  // onchange event
  const fileType = ["application/pdf"];

  const data = localStorage.getItem("result");
  let user_data = JSON.parse(data);

  const user_file_id = uuidv4();
  const storageRef = ref(
    storage,
    `Notebook/${user_data.user.uid}/${book}/${user_file_id}.pdf`
  );

  useEffect(() => {
    // //Notebook Calling
    db.collection("Notebooks")
      .doc(user_data.user.uid) //For Security Purpose
      .collection("Notebook")
      .onSnapshot((snapshot) =>
        setNotebook(
          snapshot.docs.map((doc) => ({
            id: doc.id,
          }))
        )
      );

    db.collection("Notebooks")
      .doc(user_data.user.uid) //For Security Purpose
      .collection("Notebook")
      .doc(book) //Dynamic
      .collection("Note") //Constant
      .onSnapshot((snapshot) =>
        setNote(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().Name,
            file: doc.data().File,
            time: doc.data().Time,
          }))
        )
      );
  }, [book]);

  const handlebooks = (title) => {
    setbook(title);
    console.log(title);
  };

  const handlePdfFileChange = (e) => {
    selectedFile = e.target.files[0];
    // console.log(selectedFile);
    setViewPdf(selectedFile);
  };

  const handletextchange = (e) => {
    let selectedFile = e.target.value;
    setNotename(selectedFile);

    // let name = user_data.user.displayName;
    // alert(name);
    // let _url =
    //   "https://firebasestorage.googleapis.com/v0/b/elfer10.appspot.com/o/Notebook%2F9HmPb5tAPzeBDNO04KODvVR3Frx1%2FNotebook%2F2538b629-36ba-4550-bed6-d0c2585d042d.pdf?alt=media&token=17f65021-6dc0-4fb7-8b8a-b414d919d2c5";
  };
  const handlebookchange = (e) => {
    let selectedFile = e.target.value;
    setbookfield(selectedFile);
    console.log(bookfield);
  };
  const handlebooksubmit = () => {
    if (bookfield !== "") {
      db.collection("Notebooks")
        .doc(user_data.user.uid) //For Security Purpose
        .collection("Notebook")
        .doc(bookfield + "") //For Security PurposeDynamic
        .set({Text : "Dummy"}).then(function (){
          
      db.collection("Notebooks")
        .doc(user_data.user.uid) //For Security Purpose
        .collection("Notebook")
        .doc(bookfield + "")
        .collection("Note")
        .doc()
        .set({
          File: "sample%2Fsample.pdf?alt=media&token=3d364591-5311-4be5-bb53-561c7cbd67ce",
          Name: "Sample",
          Time: new Date().getTime().toString(),
        })
        .then(function () {
          alert("hurray! your Notebook has been successfully created");
          console.log("Notebook created");
          handlebooks(bookfield);
        });
      });
        
    } else {
      alert("Please enter your notebook");
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();

    if (viewPdf) {
      // console.log(viewPdf);
      if (viewPdf && fileType.includes(viewPdf.type)) {
        // 'file' comes from the Blob or File API
        handleClose();
        alert("Please wait while we are uploading you pdf to server");
        console.log("Uploading a blob or file!" + viewPdf);
        uploadBytes(storageRef, viewPdf).then((snapshot) => {
          // Get the download URL
          getDownloadURL(storageRef)
            .then((url) => {
              setPdfFileError("");
              console.log("Download Url :" + url);
              console.log("Url :" + url);
              //========
              let pathname = url.split("/")[7];
              db.collection("Notebooks")
                .doc(user_data.user.uid) //For Security Purpose
                .collection("Notebook")
                .doc(book) //Dynamic
                .collection("Note")
                .doc()
                .set({
                  File: pathname,
                  Name: notename,
                  Time: new Date().getTime().toString(),
                })
                .then(function () {
                  alert(
                    "hurray! your file was successfully uloaded to our server"
                  );
                  console.log("Frank created");
                });
              //==========================
            })
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/object-not-found":
                  // File doesn't exist
                  break;
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;
                // ...
                case "storage/unknown":
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
          console.log("Uploaded a blob or file!");
        });
      } else {
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
    //-----------------------------------------

    // if (pdfFile !== "") {
    // } else {
    //   setViewPdf("");
    // }
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <div>
          <header class="menu__header">
            <div className="menu__header_block">
              {/* <span class="menu__title">Notebook</span> */}

              <DropdownButton
                variant="secondary"
                id="dropdown-basic-button"
                title={book}
                size="sm"
              >
                {notebook.map((notebook) => (
                  <Dropdown.Item
                    onClick={() => handlebooks(notebook.id)}
                    href="#/action-1"
                  >
                    {notebook.id}
                  </Dropdown.Item>
                ))}
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="notebook..."
                  onChange={handlebookchange}
                />
                <button
                  onClick={handlebooksubmit}
                  size="sm"
                  className="btn btn-success btn"
                >
                  UPLOAD
                </button>
              </DropdownButton>
            </div>
            <hr />
          </header>
          <div className="menu__content">
            {note.map((notes) => (
              <NoteCard title={notes.name} id={notes.id} file={notes.file} />
            ))}
          </div>
        </div>
        <footer className="menu__footer">
          <Button onClick={handleShow} className="btn" variant="dark">
            Add Section
          </Button>{" "}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-group">
                <input
                  type="file"
                  className="form-control"
                  required
                  onChange={handlePdfFileChange}
                />
                {pdfFileError && (
                  <div className="error-msg">{pdfFileError}</div>
                )}

                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Add Section"
                  onChange={handletextchange}
                />
                {pdfFileError && <div className="error-msg"></div>}
                <br></br>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={handlePdfFileSubmit}
                className="btn btn-success btn"
              >
                UPLOAD
              </button>
            </Modal.Footer>
          </Modal>
        </footer>
      </div>
      <div className="menu__doc__container">
        <Routes>
          <Route path="/:id/:name/:file" element={<MenuDoc />} />
        </Routes>
      </div>
    </div>
  );
}

export default NoteMenu;
