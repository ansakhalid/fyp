import React, { useState, useEffect, useRef } from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";

import { createProduct } from "./fetchdesigner";
import { getCategories } from "../admin/fetchadmin";

const AddProduct = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const imagePhotoRef = useRef(null);

  const [previewData, setPreviewData] = useState({
    text: "",
    textSize: "",
    xPosition: "",
    yPosition: "",
    maxWidth: "",
    rotationDegrees: "",
    textColor: "",
    imageXPosition: "",
    imageYPosition: "",
    imageWidth: "",
    imageHeight: "",
  });

  const {
    text,
    textSize,
    xPosition,
    yPosition,
    maxWidth,
    rotationDegrees,
    textColor,
    imageXPosition,
    imageYPosition,
    imageWidth,
    imageHeight,
  } = previewData;

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    imageURL: "",
    imagePhotoURL: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    designername,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    imageURL,
    imagePhotoURL,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });

    if (name === "photo") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, imageURL: e.target.result });
      };

      reader.readAsDataURL(event.target.files[0]);
    }

    if (name === "imagePhoto") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, imagePhotoURL: e.target.result });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // This function will handle the previewing of image
  const previewImage = () => {
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      var words = text.split(" ");
      var line = "";

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    };

    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, 500, 500);

    context.drawImage(imageRef.current, 0, 0);

    if (textColor === "black") {
      context.fillStyle = "#000000";
    } else {
      context.fillStyle = "#ffffff";
    }
    context.font = `normal normal bold ${textSize}px arial`;
    context.textAlign = "center";

    if (maxWidth !== "" && rotationDegrees === "") {
      wrapText(
        context,
        text,
        parseInt(xPosition),
        parseInt(yPosition),
        parseInt(maxWidth),
        parseInt(textSize)
      );
    } else if (maxWidth !== "" && rotationDegrees !== "") {
      context.save();
      context.rotate((parseInt(rotationDegrees) * Math.PI) / 180);
      wrapText(
        context,
        text,
        parseInt(xPosition),
        parseInt(yPosition),
        parseInt(maxWidth),
        parseInt(textSize)
      );
      context.restore();
    } else if (maxWidth === "" && rotationDegrees !== "") {
      context.save();
      context.rotate((parseInt(rotationDegrees) * Math.PI) / 180);
      context.fillText(text, parseInt(xPosition), parseInt(yPosition));
      context.restore();
    } else {
      context.fillText(text, parseInt(xPosition), parseInt(yPosition));
    }

    context.drawImage(
      imagePhotoRef.current,
      imageXPosition,
      imageYPosition,
      imageWidth,
      imageHeight
    );
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    formData.set("finalImageURL", canvasRef.current.toDataURL());

    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          designername: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label>Designer Name</label>
        <input
          onChange={handleChange("designername")}
          type="text"
          className="form-control"
          value={designername}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
        <button
          type="button"
          className="btn btn-primary ml-3"
          onClick={() => previewImage()}
        >
          Preview
        </button>
      </div>

      <div className="form-group">
        <label>Text</label>
        <input
          onChange={(e) =>
            setPreviewData({ ...previewData, text: e.target.value })
          }
          type="text"
          className="form-control"
          value={text}
        />
      </div>

      <div className="form-row mb-3">
        <div className="col">
          <label>Text size</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                textSize: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={textSize}
          />
        </div>
        <div className="col">
          <label>X Position</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                xPosition: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={xPosition}
          />
        </div>
        <div className="col">
          <label>Y Position</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                yPosition: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={yPosition}
          />
        </div>
      </div>

      <div className="form-row mb-3">
        <div className="col">
          <label>Max width</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                maxWidth: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={maxWidth}
          />
        </div>
        <div className="col">
          <label>Rotation degrees</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                rotationDegrees: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={rotationDegrees}
          />
        </div>
        <div className="col">
          <label>Text color</label>
          <select
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                textColor: e.target.value,
              })
            }
            className="form-control"
          >
            <option>Please select</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("imagePhoto")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-row mb-3">
        <div className="col">
          <label>Image X Position</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                imageXPosition: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={imageXPosition}
          />
        </div>
        <div className="col">
          <label>Image Y Position</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                imageYPosition: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={imageYPosition}
          />
        </div>
        <div className="col">
          <label>Image Width</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                imageWidth: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={imageWidth}
          />
        </div>
        <div className="col">
          <label>Image Height</label>
          <input
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                imageHeight: e.target.value,
              })
            }
            type="number"
            className="form-control"
            value={imageHeight}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "1rem auto" }}>
        {/* Loading the canvas */}
        <canvas
          ref={canvasRef}
          width="500px"
          height="500px"
          style={{ backgroundColor: "lightgray" }}
        ></canvas>

        <img ref={imageRef} src={imageURL} alt="" style={{ display: "none" }} />
        <img
          ref={imagePhotoRef}
          src={imagePhotoURL}
          alt=""
          style={{ display: "none" }}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <>
      <Layout
        title="Add New Product"
        description="You can add new products by filling the form below."
      />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              {showLoading()}
              {showError()}
              {showSuccess()}
              {newPostForm()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
