import React from "react";
import { API } from "../configuration";

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ minHeight: "40%", minWidth: "40%" ,maxHeight: "100%", maxWidth: "100%"}}
        />
    </div>
);

export default ShowImage;