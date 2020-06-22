import React, { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./fetchdesigner";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        console.log("Products: ", data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Layout
        title="Manage Products"
        description="Update or Delete your products"
        className="container-fluid"
      />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">Total {products.length} products</h4>
              <hr />
            </div>
          </div>
          <div className="row">
            {products.map((p) => (
              <div
                key={p._id}
                className="col-sm col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"
              >
                <div className="product">
                  <span className="img-prod">
                    <img
                      className="img-fluid"
                      src={`${process.env.REACT_APP_API_URL}/product/photo/${p._id}`}
                      alt="Colorlib Template"
                    />
                  </span>
                  <div className="text py-3 px-3">
                    <h3>{p.name}</h3>
                    <div className="d-flex">
                      <div className="pricing">
                        <p className="price">
                          <span>${p.price}</span>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <p className="bottom-area d-flex">
                      <Link
                        to={`/designer/product/update/${p._id}`}
                        className="add-to-cart"
                      >
                        <span>Update</span>
                      </Link>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => destroy(p._id)}
                        className="ml-auto add-to-cart text-danger"
                      >
                        Delete
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageProducts;
