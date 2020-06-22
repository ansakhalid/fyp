import React from "react";
import Menu from "./menu";
import "../styles.css";
import { Link } from "react-router-dom";

const Layout = ({ title, description, className, isHome = false }) => (
  <>
    <nav
      className={
        isHome
          ? "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
          : "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light ftco-navbar-light-2"
      }
      id="ftco-navbar"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          ArtInk
        </Link>
        <Menu />
      </div>
    </nav>
    {!isHome && (
      <div
        class="hero-wrap hero-bread"
        style={{ backgroundImage: "url('/images/bg_6.jpg')" }}
      >
        <div class="container">
          <div class="row no-gutters slider-text align-items-center justify-content-center">
            <div class="col-md-9 ftco-animate text-center fadeInUp ftco-animated">
              <h1 class="mb-0 bread">{title}</h1>
              <h5 class="mb-0">{description}</h5>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

export default Layout;
