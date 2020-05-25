import React, { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { listOrders, getStatusValues, updateOrderStatus } from "./fetchadmin";
import ShowImage from "../Components/image";

const Record = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 >
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h2 className=" mb-4">Status: {o.status}</h2>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="PURCHASE RECORDS"
            description={`WELCOME ${
                user.name
            }, you can view purchase records here`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                             
                            >
                                <h1 className="mb-5">
                                    <span >
                                        Order ID: {o._id}
                                    </span>
                                </h1>

                                

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            
                                        }}
                                        
                                    >
                                        <div className="position-relative">
                                                 <ShowImage item={p} url="product" style={{ minHeight: "40%", minWidth: "40%"}} />
                                                 </div>
                                       
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Record;