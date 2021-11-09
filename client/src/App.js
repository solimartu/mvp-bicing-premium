import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  let [reservations, setReservations] = useState([]);
  let [newReservation, setNewReservation] = useState({
    PickUpStation: "",
    PickUpTime: "",
    ReturnStation: "",
    ReturnTime: "",
    userId: "1",
    PathName: "",
    Favourite: "0",
  });
  let [error, setError] = useState(null);

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = () => {
    fetch("/myreservations")
      .then((response) => response.json())
      .then((reservations) => {
        setReservations(reservations);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewReservation((state) => ({ ...state, [name]: value }));
  };

  const {
    PickUpStation,
    PickUpTime,
    ReturnStation,
    ReturnTime,
    userId,
    PathName,
    Favourite,
  } = newReservation;
  const addNewReservation = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/myreservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });
      if (!res.ok) throw new Error("There was an error");
      const data = await res.json();
      getReservations();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReservation = async (reservation) => {
    try {
      const res = await fetch(`/myreservations/${reservation.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("There was an error");
      const results = await res.json();
      console.log("data frontend:", results.data);
      getReservations();
      //setReservations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const setToFavourite = async (reservation) => {
    try {
      const res = await fetch(`/myreservations/${reservation.id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("There was an error");
      const results = await res.json();

      getReservations();
      //setReservations(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App container text-center mt-4 d-flex flex-column align-center">
      <header className="App-header pb-3">
        Welcome to your Bicing account
      </header>

      <form
        onSubmit={(e) => addNewReservation(e)}
        className="d-flex flex-column"
      >
        <div className="row flex-column">
          Add a name to your everyday path:
          <input
            name="PathName"
            value={PathName}
            onChange={(e) => handleChange(e)}
            placeholder="e.g. home-codeOp"
            className="text-center rounded"
          ></input>
        </div>
        <div className="row flex-column pt-2 pb-2 rounded border mt-3 mb-3 bg-danger text-white">
          <h5>Starting point</h5>
          <div className="row">
            <div className="col-6">
              Which is your nearest station to start your trip?
              <input
                name="PickUpStation"
                value={PickUpStation}
                onChange={(e) => handleChange(e)}
                className="text-center mt-1"
                placeholder="Carrer de ..."
              ></input>
            </div>
            <div className="col-6">
              What time are you used to grab your bike?
              <input
                type="datetime-local"
                className="text-center mt-1"
                name="PickUpTime"
                value={PickUpTime}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
        </div>
        <div className="row flex-column pt-2 pb-2 rounded border mt-1 mb-3 bg-danger text-white">
          <h5>Ending point</h5>
          <div className="row">
            <div className="col-6">
              Which is your nearest station to end your trip?
              <input
                name="ReturnStation"
                value={ReturnStation}
                onChange={(e) => handleChange(e)}
                className="text-center mt-1"
                placeholder="Carrer de ..."
              ></input>
            </div>
            <div className="col-6">
              What time are you used to leave your bike?
              <input
                type="datetime-local"
                className="text-center mt-1"
                name="ReturnTime"
                value={ReturnTime}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-dark mt-3 m-auto">
          Add your new path
        </button>
      </form>
      <section>
        <table class="table table-dark mt-4">
          <thead>
            <tr>
              <th scope="col">PathName</th>
              <th scope="col">Pick Up Station</th>
              <th scope="col">Pick Up Time</th>
              <th scope="col">Return Station</th>
              <th scope="col">Return Time</th>
              <th scope="col">Fav</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <th scope="row">{reservation.PathName}</th>
                  <td>{reservation.PickUpStation}</td>
                  <td>{reservation.PickUpTime}</td>
                  <td>{reservation.ReturnStation}</td>
                  <td>{reservation.ReturnTime}</td>
                  <td>
                    {reservation.Favourite}
                    <button
                      onClick={() => deleteReservation(reservation)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      x
                    </button>
                    <button
                      onClick={() => setToFavourite(reservation)}
                      className="btn btn-sm btn-outline-warning"
                    >
                      F
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
/*
<li>
  <input type="checkbox" id="mon"/>
	<label for="mon">MON</label>
</li>*/
