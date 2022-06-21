import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "./../components/Success";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const register = async () => {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const result = await axios.post("/api/users/register", user).data;
        setLoading(false);
        setSuccess(true);

        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
      } catch (e) {
        console.error("Error : ", e);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        {loading && <Loader />}
        {error && <Error />}
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successfull" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="password"
              className="form-control"
              placeholder="Confrim Password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            ></input>

            <button className="btn btn-primary  mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
