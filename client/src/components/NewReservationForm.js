import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
// import { Link } from "react-router-dom";

export default function NewReservationForm() {
  useEffect(() => {
    getFavourites();
  }, []);

  const getFavourites = () => {
    fetch("/myreservations/favourites")
      .then((response) => response.json())
      .then((favourites) => setFavs(favourites))
      .catch((error) => setError(error));
  };

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
  let [favs, setFavs] = useState([]);

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
      //   getReservations();
    } catch (err) {
      console.log(err);
    }
  };
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "compare",
    },
  });

  return (
    <div className="container">
      <form
        onSubmit={(e) => addNewReservation(e)}
        className="d-flex flex-column"
      >
        <div className="row">
          <div className="col-6">
            Add a name to your everyday path:
            <input
              name="PathName"
              value={PathName}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. home-codeOp"
              className="text-center rounded"
            ></input>
          </div>
          <div className="col-6">
            Or select one of your favs
            <select value={Favourite}>
              {favs &&
                favs.map((fav) => <option key={fav.id}>{fav.PathName}</option>)}
            </select>
          </div>
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
              <DateRangePicker
                ranges={[state.selection, state.compare]}
                onChange={(item) => setState({ ...state, ...item })}
                months={1}
                minDate={addDays(new Date(), -30)}
                maxDate={addDays(new Date(), 30)}
                // disabledDates=
              ></DateRangePicker>
            </div>
            {/* <div>
              <DateRange ></DateRange>
            </div> */}
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
        {/* <Link
          to="/reservations"
          type="submit"
          className="btn btn-outline-dark mt-3 m-auto"
        >
          Add your new path
        </Link> */}
        <button type="submit" className="btn btn-outline-dark mt-3 m-auto">
          Add your new path
        </button>
      </form>
    </div>
  );
}
