import React, { useState, useEffect } from "react";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = {
      email,
      password,
    };
    console.log(user);
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Login</h2>

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

            <button className="btn btn-primary  mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;