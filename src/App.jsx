import "./App.css";
import { useState, useRef } from "react";
import _ from "lodash";
import { useEffect } from "react";
const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
function App() {
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const filePicekerRef = useRef();

  //Onchange event on file input
  function handleFilePreview(e) {
    const { files } = e.target; // fetching all the files
    const validImageFiles = []; // Storing all the the file to this variable

    //Looping through all the image and validate all the images (Avoid regex use input field validation)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      //If Validated file added to the validImages files
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }

    //If Valid Files exist add to use variable
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  }

  //Useeffect with dependance to the usestate
  useEffect(() => {
    const images = [],
      fileReaders = [];
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        //Reading file location to generate preview
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  }, [imageFiles]);

  return (
    <div
      className="App"
      style={{
        listStyle: "none",
        display: "grid",
        placeContent: "center",
        maxWidth: "800px",
        marginTop: "2rem",
        margin: "auto",
      }}
    >
      <div
        style={{
          margin: "1rem",
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          className="input-field"
          style={{
            fontSize: "2rem",
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            marginBottom: "2rem",
          }}
          placeholder="Blog's Title"
        />
        <textarea
          name="content"
          id="content"
          cols="40"
          rows="20"
          placeholder="About Blog"
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            width: "100%",
            backgroundColor: "#F1F6F5",
            outline: "none",
          }}
        />
        <input
          ref={filePicekerRef}
          accept="image/*, video/*"
          onChange={handleFilePreview}
          type="file"
          hidden
          multiple
        />

        {images.length > 0 ? (
          <>
            <p>Uploaded Images</p>

            <ul
              style={{
                listStyle: "none",
                padding: "0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(auto,240px))",
                gap: "1rem",
                placeContent: "center",
              }}
            >
              {images.map((image, idx) => {
                return (
                  <li key={idx}>
                    <img
                      src={image}
                      alt=""
                      style={{
                        objectFit: "cover",
                        height: "150px",
                      }}
                      className="image-hover"
                      width="100%"
                    />
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <button
            className="btn"
            style={{
              fontSize: "1rem",
              padding: ".5rem 2rem",
              border: "none",
              background: "#6D67E4",
              color: "white",
              borderRadius: "50px",
            }}
            onClick={() => filePicekerRef.current.click()}
          >
            Choose
          </button>
          <button
            style={{
              fontSize: "1rem",
              padding: ".5rem 2rem",
              border: "none",
              background: "#6D67E4",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
