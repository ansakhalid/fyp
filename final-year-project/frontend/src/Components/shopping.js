import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./deafaultdesign";
import { getCart } from "./cart";
import Card from "./productdisplay";
import Checkout from "./paymentprocessing";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div className="col-xs-12 col-md-8">
        <h6>Your cart has {`${items.length}`} items</h6>
        <hr />
        <div className="row">
          {items.map((product, i) => (
            <div
              key={i}
              className="col-sm col-md-8 col-lg-4 ftco-animate fadeInUp ftco-animated"
            >
              <Card
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <div style={{ textAlign: "center" }}>
      <img
        src={require("./images/undraw_empty_cart_co35.png")}
        alt="Empty Cart"
        width="500px"
      />
      <h2>
        Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
      </h2>
    </div>
  );

  return (
    <>
      <Layout
        title="Shopping Cart"
        description="Manage your cart items. Add remove checkout or continue shopping."
        className="container-fluid"
      />

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div class="col-md-12 ftco-animate fadeInUp ftco-animated">
              {items.length === 0 && noItemsMessage()}
              {items.length > 0 && (
                <div className="row">
                  {showItems(items)}
                  <div class="col col-xs-12 col-md-4 mt-5 cart-wrap ftco-animate fadeInUp ftco-animated">
                    <div class="cart-total mb-3">
                      <h3>Cart Summary</h3>
                      <Checkout products={items} setRun={setRun} run={run} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {items.length > 0 && <div class="row justify-content-end"></div>}
        </div>
      </section>
    </>
  );
};

export default Cart;
