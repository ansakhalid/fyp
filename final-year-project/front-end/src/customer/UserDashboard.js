import React, { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import Card from '../Components/productdisplay';
import { getProducts } from '../Components/Componentsfetch';
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./fetchuser";
import moment from "moment";
import ShowImage from "../Components/image";
import Search from "../Components/productsearch";

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [ setError] = useState(false);
    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
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
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

     const init = (userId, token) => {
         getPurchaseHistory(userId, token).then(data => {
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
                        {role.toString() === 'admin' ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-5 text-dark">
                <h4 className="card-header">Purchase history</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <div className="position-relative">
                                                 <ShowImage item={p} url="product" style={{ minHeight: "40%", minWidth: "40%"}} />
                                                 </div>
                                       
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Welcome ${name}!`}
            className="container-fluid"
        >
              <Search />
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                    <h2 className="text-dark">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className=" text-dark">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;