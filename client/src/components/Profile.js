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
      <section className="row d-flex justify-content-center">
        <div className="col-3">
          <img
            src={user.profilePic}
            className="img-fluid"
            alt="profile pic"
          ></img>
        </div>
        <div className="col-9 d-flex flex-column justify-content-center text-left">
          <header className="App-header pb-3">
            Welcome to your Bicing account {user.firstName}!
          </header>
          <h5 className="">{user.firstName}</h5>
          <h5 className="">{user.lastName}</h5>
          <h5 className="text-warning">{user.userName}</h5>
          <div className="row d-flex mb-3 btn-group">
            <Link to="/reservations" className="btn btn-md btn-danger me-2">
              My Reservations
            </Link>
            <Link to="/new" className="btn btn-md btn-danger">
              Add a new reservation
            </Link>
          </div>
        </div>
      </section>

      <Outlet />
    </div>
  );
}
