import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";

export default function Profile() {
  //a fake user by the moment
  const [user, setUser] = useState({
    firstName: "Solange",
    lastName: "Marturet",
    profilePic:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png",
    userName: "solimartu",
  });

  return (
    <div className="App container text-center mt-4 d-flex flex-column align-center">
      <section className="row d-flex justify-content-center p-2">
        <div className="col-9 roundedbig bg-light mb-2">
          <div className="row">
            <div className="col-4">
              <img
                src={user.profilePic}
                className="img-fluid"
                alt="profile pic"
              ></img>
            </div>
            <div className="col-8 d-flex flex-column justify-content-center text-left p-2">
              <header className="App-header pb-3">
                Welcome to your Bicing account {user.firstName}!
              </header>
              <h5 className="">
                <small className="casibold text-danger">Name:</small>{" "}
                {user.firstName}
              </h5>
              <h5 className="">
                <small className="casibold text-danger">Last Name:</small>{" "}
                {user.lastName}
              </h5>
              <h5 className="">
                <small className="casibold text-danger">User Name:</small>{" "}
                <span className="text-warning">{user.userName}</span>
              </h5>
              <div className="row d-flex pl-2 btn-group pt-2">
                <Link to="/reservations" className="btn btn-md btn-danger me-2">
                  My Reservations
                </Link>
                <Link to="/new" className="btn btn-md btn-danger">
                  Add a new reservation
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3 d-flex flex-column justify-content-center rounded">
          <img src="../bici.jpg"></img>
        </div>
      </section>

      <Outlet />
    </div>
  );
}
