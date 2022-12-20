import "./App.css";
import { useState, useRef } from "react";
import _ from "lodash";

const data = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1655976796204-308e6f3deaa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1640972040132-28b62b6b3718?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1615503340408-006f2de60a05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

function App() {
  const [image, setimage] = useState([]);
  const filePicekerRef = useRef();

  function handleFilePreview(e) {
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    reader.onload = (readerEvent) => {
      setimage(readerEvent.target.result);
    };
  }
  function removePreview() {
    setimage(null);
  }

  return (
    <div
      className="App"
      style={{
        listStyle: "none",
        display: "grid",
        placeContent: "center",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "1rem",
      }}
    >
      <input
        type="text"
        name="title"
        id="title"
        className="input-field"
        placeholder="Blog's Title"
      />
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="About Blog"
        style={{
          background: "none",
          border: "none",
          fontSize: "1rem",
          width: "100%",
        }}
      ></textarea>
      <ul
        style={{
          listStyle: "none",
          display: "grid",
          placeContent: "center",
          width: "100%",
          padding: "0",
        }}
      >
        {data?.map((img, index) => {
          return (
            <li key={index}>
              <img src={img.imgUrl} width="100%" alt="" />
            </li>
          );
        })}
      </ul>
      <input
        ref={filePicekerRef}
        accept="image/*, video/*"
        onChange={handleFilePreview}
        type="file"
        hidden
        multiple
      />

      {image != null && <img src={image} width="100%" alt="" />}

      <div className="uploadBtn">
        <div className="file-control-btns">
          <button
            className="btn"
            onClick={() => filePicekerRef.current.click()}
          >
            Choose
          </button>
          <button className="btn" onClick={removePreview}>
            x
          </button>
        </div>
        <button>Upload Image</button>
      </div>
    </div>
  );
}

export default App;
