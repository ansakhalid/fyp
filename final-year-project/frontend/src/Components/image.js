import React from "react";
import { API } from "../configuration";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      //   src={`${API}/${url}/photo/${item._id}`}
      src={`${process.env.REACT_APP_API_URL}/product/photo/${item._id}`}
      // src={`${item !== null ? item.photo.data : ''}`}
      alt={item.name}
      className="mb-3"
      style={{
        minHeight: "40%",
        minWidth: "40%",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    />
    {/* {console.log(item.photo.data)} */}
  </div>
);

export default ShowImage;
