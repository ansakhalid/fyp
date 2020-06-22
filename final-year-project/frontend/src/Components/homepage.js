import React from "react";
import Layout from "./deafaultdesign";

import ShopHome from "./shophome";

const Home = () => {
  return (
    <>
      <Layout isHome />
      <div
        className="hero-wrap js-fullheight"
        style={{
          backgroundImage: "url('/images/home-bg.jpg')",
          height: window.innerHeight,
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row no-gutters slider-text js-fullheight align-items-center justify-content-center"
            style={{ height: window.innerHeight }}
          >
            <h3 className="v">ArtInk - Time to get dress</h3>
            {/* <h3 className="vr">Since - 1985</h3> */}
            <div className="col-md-11 text-center">
              <h1>Art-Ink</h1>
              <h2>
                <span>
                  Custom designed fashionable and trendy clothes to your home in
                  a click
                </span>
              </h2>
            </div>
            <div className="mouse">
              <a href="#" className="mouse-icon">
                <div className="mouse-wheel">
                  <span className="ion-ios-arrow-down"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="goto-here"></div>
      {/* <ShopHome /> */}
      {/* <section class="ftco-section ftco-product">
        <div class="container">
          <div class="row justify-content-center mb-3 pb-3">
            <div class="col-md-12 heading-section text-center ftco-animate fadeInUp ftco-animated">
              <h1 class="big">Trending</h1>
              <h2 class="mb-4">Trending</h2>
            </div>
          </div>
        </div>
        <section class="row">
          <div class="col-md-12">
            <div class="product-slider owl-carousel ftco-animate owl-loaded owl-drag fadeInUp ftco-animated"></div>
          </div>
        </section>
      </section> */}
    </>
  );
};

export default Home;
