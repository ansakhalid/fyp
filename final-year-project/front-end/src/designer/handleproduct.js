import React, { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./fetchdesigner";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
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
        <Layout
            title="Manage Products"
            description="Update or Delete your products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">
                        Total {products.length} products
                    </h4>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong className='text-dark'>{p.name}</strong>
                                <Link  to={`/designer/product/update/${p._id}`}>
                                    <span >
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;