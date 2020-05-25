import React from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";

const DesignerDashboard = () => {
    const {
        user: {  name, email, role }
    } = isAuthenticated();

    const designerLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header  text-dark">Designer Links</h4>
                <ul className="list-group">
                 
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            CREATE PRODUCT
                        </Link>
                    </li>
                   
                    <li className="list-group-item">
                        <Link className="nav-link" to="/designer/products">
                            MANAGE LISTING
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const designerInfo = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header  text-dark">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item text-dark">{name}</li>
                    <li className="list-group-item text-dark">{email}</li>
                    <li className="list-group-item text-dark">
                        {role.toString() === 'designer' ? "Designer" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Welcome  ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{designerLinks()}</div>
                <div className="col-9">{designerInfo()}</div>
            </div>
        </Layout>
    );
};

export default DesignerDashboard;