import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../path/fetchprofiling";
import { itemTotal } from "./cart";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "blue" };
    } else {
        return { color: "black" };
    }
};

const Menu = ({ history }) => (
    <div >
       
        <ul className="nav nav-tabs  fixed-top ">
            <li className="nav-item ">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>
            
            
            {isAuthenticated() && isAuthenticated().user.role.toString() === 'admin' && (

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>)}

            {isAuthenticated() && isAuthenticated().user.role.toString() === 'customer' && (
            <li className="nav-item">
                <Link className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop">
                    Shop
                    </Link>
                    </li>)}


            {isAuthenticated() && isAuthenticated().user.role.toString() === 'customer' && (

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
            )}
           
            {isAuthenticated() && isAuthenticated().user.role.toString() === 'designer' && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/designer/dashboard")}
                        to="/designer/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role.toString() === 'customer' && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role.toString() === 'admin' && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "black" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}


        </ul>
    </div>
);

export default withRouter(Menu); //withrouter to access props history