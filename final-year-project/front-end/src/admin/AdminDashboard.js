import React from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
    const {
        user: {  name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header  text-dark">MANAGEMENT</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            CREATE A NEW CATEGORY
                        </Link>
                    </li>
                   
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            MANAGE ORDERS
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/record">
                            PURCHASE RECORD
                        </Link>
                    </li>
                   
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card ">
                <h4 className="card-header  text-dark">BASIC INFORMATION</h4>
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

    return (
        <Layout
            title="Dashboard" 
            description={`Welcome ADMIN!`}
            className="container-fluid "
        >
            <div className="row">
            <div className="col-12">{adminInfo()}</div>
                <div className="col-12">{adminLinks()}
                </div>
               
            </div>
        
        </Layout>
    );
};

export default AdminDashboard;