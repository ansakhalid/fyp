import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../path/fetchprofiling";
import { itemTotal } from "./cart";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red" };
  } else {
    return { color: "white" };
  }
};

const Menu = ({ history }) => (
  <>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#ftco-nav"
      aria-controls="ftco-nav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="oi oi-menu"></span> Menu
    </button>
    <div className="collapse navbar-collapse" id="ftco-nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
          )}

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "customer" && (
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
          )}

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "customer" && (
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart{" "}
                <sup>
                  <small className="cart-badge">{itemTotal()}</small>
                </sup>
              </Link>
            </li>
          )}

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "designer" && (
            <li className="nav-item">
              <Link className="nav-link" to="/designer/dashboard">
                Dashboard
              </Link>
            </li>
          )}

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "customer" && (
            <li className="nav-item">
              <Link className="nav-link" to="/user/dashboard">
                Dashboard
              </Link>
            </li>
          )}

        {isAuthenticated() &&
          isAuthenticated().user.role.toString() === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
          )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              <b>Signout</b>
            </span>
          </li>
        )}
      </ul>
    </div>
  </>
);

export default withRouter(Menu); //withrouter to access props history
