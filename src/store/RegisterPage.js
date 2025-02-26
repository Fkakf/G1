import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="card-title text-center mb-3">Register</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
