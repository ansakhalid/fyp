import React, { useState, useEffect } from "react";
import Layout from "./deafaultdesign";
import Card from "./productdisplay";
import { getCategories, getFilteredProducts } from "./Componentsfetch";
import Checkbox from "./categoryfilter";

import { prices } from "./fixedPrices";
import Search from "./productsearch";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <>
      <Layout
        title="HAPPY SHOPPING :)"
        description="Latest trendy clothes at a single click"
        className="container-fluid"
      />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <Search />
            </div>
          </div>
          <div className="row">
            <div className="col-3 ">
              <h5 style={{ textAlign: "center" }}>Filter by categories</h5>
              <hr />
              <ul>
                <Checkbox
                  categories={categories}
                  handleFilters={(filters) =>
                    handleFilters(filters, "category")
                  }
                />
              </ul>
            </div>

            <div className="col-9">
              <h5 style={{ textAlign: "center" }}>
                Shop Your Favourite Products
              </h5>
              <hr />
              <div className="row">
                {filteredResults.map((product, i) => (
                  <div
                    key={i}
                    className="col-sm col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"
                  >
                    <Card product={product} />
                  </div>
                ))}
                {filteredResults.length === 0 && (
                  <>
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <img
                        src={require("./images/undraw_not_found_60pq.png")}
                        width="500px"
                        alt="Empty"
                      />
                      <h5>No products in the catalog yet!</h5>
                    </div>
                  </>
                )}
              </div>
              <hr />
              {loadMoreButton()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
