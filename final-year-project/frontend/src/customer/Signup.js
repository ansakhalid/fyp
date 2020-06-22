import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/deafaultdesign";
import { signup } from "../path/fetchprofiling";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    error: "",
    success: false,
  });

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "#ffffff" };
    }
  };

  const { name, email, password, role, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, role }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          role: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label>Role</label>
        <select onChange={handleChange("role")} className="form-control">
          <option>Please select from the below mentioned options</option>
          <option value="designer">designer</option>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <>
      <Layout
        title="Signup"
        description="Signup to enjoy "
        className="container col-md-8 offset-md-2"
      />
      <div className="container my-5">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            {showSuccess()}
            {showError()}
            {signUpForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
