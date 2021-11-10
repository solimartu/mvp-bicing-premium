import React, { useEffect, useState } from "react";

export default function Reservations() {
  let [reservations, setReservations] = useState([]);
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
      //   setFavs((state) => ({...state,{reservation}}))
      //   setFavs((state) => state.filter((e) => e.Favourite === 1));
      //setReservations(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
                      className="btn btnx btn-sm btn-danger mr-1"
                    >
                      x
                    </button>
                    {/* <button
                      onClick={() => setToFavourite(reservation)}
                      className="btn btn-sm btn-outline-warning"
                    >
                      F
                    </button> */}
                    <label className="switch">
                      <input
                        type="checkbox"
                        onClick={() => setToFavourite(reservation)}
                        className={
                          reservation.Favourite ? "bg-primary" : "bg-secondary"
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
