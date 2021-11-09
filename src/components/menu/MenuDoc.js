import React, { useState, useEffect } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
import { themePlugin } from "@react-pdf-viewer/theme";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

//Refrence Path
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Menu from "./MenuDoc.css";
const storage = getStorage();
const storageRef = ref(storage, "Notebook/uid/haly.pdf");

//-----------------------------------------------------------------------------------------------------------

function MenuDoc() {
  const themePluginInstance = themePlugin();
  const _url =
    "https://firebasestorage.googleapis.com/v0/b/elfer10.appspot.com/o/";

  let file = window.location.href;
  var pathname = file.split("/")[6];
  // console.log("🤐" + pathname);

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer
                theme="dark"
                plugins={[themePluginInstance]}
                // fileUrl={viewPdf}           VIA File Manager
                // fileUrl={
                //   "https://firebasestorage.googleapis.com/v0/b/elfer10.appspot.com/o/Notebook%2Fuid%2Fhaly.pdf?alt=media&amp;token=eba750b9-ed86-45a9-a5bb-cd01ce815bed"
                // }
                // https://firebasestorage.googleapis.com/v0/b/elfer10.appspot.com/o/http://localhost:3000/Notes/fKwISfGs4eH8jKVhvmIk/God%20of%20war/Notebook%2Fuid%2FHarry%20Potter%20the%20philoshoper%20stone.pdf?alt=media&token=c40a22c1-5e0e-4dcf-be80-e02832de6df4
                fileUrl={_url + pathname}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        }

        {/* if we dont have pdf or viewPdf state is null */}
        {/* {!viewPdf && <>No pdf file selected</>} */}
      </div>
    </div>
  );
}

export default MenuDoc;
