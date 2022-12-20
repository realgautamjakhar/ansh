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
  const [image, setImage] = useState();
  const filePicekerRef = useRef();

  function handleFilePreview(e) {
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
      console.log(readerEvent.target.result);
    };
  }
  function removePreview() {
    setImage(null);
  }

  return (
    <div
      className="App"
      style={{ listStyle: "none", display: "grid", placeContent: "center" }}
    >
      <input
        type="text"
        name="title"
        id="title"
        className="input-field"
        placeholder="Blog's Title"
      />
      <ul
        style={{ listStyle: "none", display: "grid", placeContent: "center" }}
      >
        {data?.map((img, index) => {
          return (
            <li>
              <img
                src={img.imgUrl}
                width="100%"
                style={{ maxWidth: "800px" }}
                alt=""
                key={index}
              />
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
      />

      {image != null && (
        <img src={image} style={{ maxWidth: "800px" }} alt="" />
      )}

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
