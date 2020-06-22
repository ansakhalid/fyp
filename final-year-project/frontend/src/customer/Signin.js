import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../Components/deafaultdesign";
import { signin, authenticate, isAuthenticated } from "../path/fetchprofiling";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signinForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role.toString() === "admin") {
        return <Redirect to="/admin/dashboard" />;
      } else if (user && user.role.toString() === "designer") {
        return <Redirect to="/designer/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <Layout
        title="Signin"
        description="Provide following credentials to sign in to your account "
        className="container col-md-8 offset-md-2"
      />
      <section className="ftco-section bg-light">
        <div className="container my-5">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              {showLoading()}
              {showError()}
              {signinForm()}
              {redirectUser()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
