import React, { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import Card from "../Components/productdisplay";
import { getProducts } from "../Components/Componentsfetch";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./fetchuser";
import Search from "../Components/productsearch";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [setError] = useState(false);
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header  text-dark">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header  text-dark">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item text-dark">{name}</li>
          <li className="list-group-item text-dark">{email}</li>
          <li className="list-group-item text-dark">
            {role.toString() === "admin" ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    console.log("History: ", history);
    return (
      <div className="card mb-5 text-dark">
        <h4 className="card-header">Purchase history</h4>
        {history.length === 0 && (
          <p className="text-center py-5">You haven't purchase anything yet.</p>
        )}
        {history.length > 0 && (
          <>
            <div className="container my-2">
              {history.map((p) => (
                <div className="row">
                  <div className="col">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          {p.transaction_id}{" "}
                          <span class="badge badge-info">{p.status}</span>
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                          ${p.amount} - <b>Total Products: </b>{" "}
                          {p.products.length} - <b>Order Date: </b>{" "}
                          {moment(p.createdAt).format("LLL")}
                        </h6>
                        <div className="container">
                          <div className="row">
                            {p.products.map((product) => (
                              <div
                                className="col-xs-12 col-md-6 col-lg-4"
                                key={product._id}
                              >
                                <Card product={product} isRatingEnabled />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Layout
        title="Dashboard"
        description={`Welcome ${name}!`}
        className="container-fluid"
      />
      <section>
        <div className="container mt-3">
          <div className="row ">
            <div className="col-12">
              <Search />
            </div>
          </div>
          <div className="row">
            <div className="col-3">{userLinks()}</div>
            <div className="col-9">
              {userInfo()}
              {purchaseHistory(history)}
              {productsBySell.length > 0 && (
                <>
                  <h2 className="text-dark">Best Sellers</h2>
                  <div className="row">
                    {productsBySell.map((product, i) => (
                      <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {productsByArrival.length > 0 && (
                <>
                  <h2 className=" text-dark">New Arrivals</h2>
                  <div className="row">
                    {productsByArrival.map((product, i) => (
                      <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {productsByArrival.length > 0 && (
                <>
                  <h2 className=" text-dark">Recommended</h2>
                  <div className="row">
                    {productsByArrival.map((product, i) => (
                      <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
