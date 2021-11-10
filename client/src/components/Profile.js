import { Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "Solange",
    lastName: "Marturet",
    profilePic:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png",
    userName: "solimartu",
  });
  return (
    <div className="App container text-center mt-4 d-flex flex-column align-center">
      <header className="App-header pb-3">
        Welcome to your Bicing account {user.firstName}!
      </header>
      <section className="row d-flex justify-content-center">
        <div className="col-3">
          <img src={user.profilePic} className="img-fluid"></img>
        </div>
        <div className="col-9 d-flex flex-column justify-content-left">
          <h5 className="text-left">{user.firstName}</h5>
          <h5 className="text-left">{user.lastName}</h5>
          <h5 className="text-left text-warning">{user.userName}</h5>
        </div>
      </section>
      <div className="row d-flex mb-3">
        <Link to="/reservations" className="btn btn-md btn-dark m-auto">
          My Reservations
        </Link>
        <Link to="/new" className="btn btn-md btn-dark m-auto">
          Add a new reservation
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
