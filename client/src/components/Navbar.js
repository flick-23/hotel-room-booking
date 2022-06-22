import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="home">
            Hotel Rooms
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <i class="fa-duotone fa-bars"></i>
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-5">
              {user ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i class="fa fa-user"></i> {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => {
                          localStorage.removeItem("currentUser");
                          window.location.href = "/login";
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="register"
                    >
                      Register
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
