import React from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/fetchprofiling";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header  text-center">MANAGEMENT</h4>
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
      <div className="card">
        <h4 className="card-header  text-dark text-center">
          BASIC INFORMATION
        </h4>

        <ul className="list-group">
          <li className="list-group-item text-dark">{name}</li>
          <li className="list-group-item text-dark">{email}</li>
          <li className="list-group-item text-dark">
            {role.toString() === "admin" ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Layout
        title="Dashboard"
        description={`Welcome ADMIN!`}
        className="container-fluid "
      />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="info bg-white">{adminInfo()}</div>
            </div>
            <div className="col-4">{adminLinks()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
