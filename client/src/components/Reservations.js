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
              <th scope="col">Days Range</th>
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
                  <td>{reservation.daysrange}</td>
                  <td>{reservation.PickUpStation}</td>
                  <td>{reservation.picktime}</td>
                  <td>{reservation.ReturnStation}</td>
                  <td>{reservation.retime}</td>
                  <td className="row align-center">
                    <div class="col">{reservation.Favourite}</div>
                    <div class="col">
                      <button
                        onClick={() => deleteReservation(reservation)}
                        className="btn btnx btn-sm btn-danger mb-2"
                      >
                        x
                      </button>
                    </div>
                    <div class="col">
                      <label className="switch">
                        <input
                          type="checkbox"
                          onClick={() => setToFavourite(reservation)}
                          className={
                            reservation.Favourite
                              ? "bg-primary"
                              : "bg-secondary"
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    {/* <button
                      onClick={() => setToFavourite(reservation)}
                      className="btn btn-sm btn-outline-warning"
                    >
                      F
                    </button> */}
                    {/* <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        onClick={() => setToFavourite(reservation)}
                        // className={
                        //   reservation.Favourite ? "form-check-input" : "bg-secondary"
                        // }
                        className="form-check-input"
                        id="flexSwitchCheckDefault"
                      />
                    </div> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
