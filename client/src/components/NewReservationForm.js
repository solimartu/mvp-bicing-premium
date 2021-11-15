import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file for the calendar
import "react-date-range/dist/theme/default.css"; // theme css file for the calendar
import { DateRange } from "react-date-range"; // library for the calendar
import { addDays } from "date-fns"; // library for the calendar

import BiciPoint from "./BiciPoint";

export default function NewReservationForm() {
  //useEffect to display the favourites into a select list
  useEffect(() => {
    getFavourites();
  }, []);

  // the function to get the favourites from the DB
  const getFavourites = () => {
    fetch("/myreservations/favourites")
      .then((response) => response.json())
      .then((favourites) => setFavs(favourites))
      .catch((error) => setError(error));
  };

  // my DB data
  let [newReservation, setNewReservation] = useState({
    PickUpStation: "",
    ReturnStation: "",
    userId: "1",
    PathName: "",
    Favourite: "0",
    picktime: "",
    retime: "",
    daysrange: "",
  });

  // to display the error -not sure if i'm using it or not really-
  let [error, setError] = useState(null);
  // keeping the favourites data to be used then
  let [favs, setFavs] = useState([]);

  const {
    PickUpStation,
    ReturnStation,
    userId,
    PathName,
    Favourite,
    picktime,
    retime,
    daysrange,
  } = newReservation;

  // to set the range of days from the calendar
  const [daysOfWeek, setDaysOfWeek] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  });

  // every time that i put something on the inputs i see the changes. The range of days is to translate data from the calendar. I need to improve that showing just the days like (TUESDAY TO FRIDAY)
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const rangeOfDays = `${daysOfWeek.selection.startDate},${daysOfWeek.selection.endDate}`;
    setNewReservation((state) => ({
      ...state,
      [name]: value,
      daysrange: rangeOfDays,
    }));
  };

  //my function to add a new reservation after filling the fields (path name, the range in the calendar, starting point and time, ending point and time)
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
    } catch (err) {
      console.log(err);
    }
  };

  // the function to click a station and add its name into the input below
  const handleClickOnMap = (bici, name) => {
    const nameDeStation = bici.name;
    setNewReservation((state) => ({
      ...state,
      [name]: nameDeStation,
    }));
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => addNewReservation(e)}
        className=" row d-flex bg-dark rounded border text-white p-3 justify-content-center"
      >
        <div className="col-4">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="intro">Let's fill it!</h6>
            <p className="m-0 pb-1">Add a name to your everyday path:</p>
            <input
              name="PathName"
              value={PathName}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. home-codeOp"
              className="text-center rounded m-auto"
            ></input>
          </div>
          <div className="d-flex flex-column justify-content-center pt-1">
            <p className="m-0 pb-1">Or select one of your favs</p>
            <select value={Favourite} className="m-auto mb-2">
              {favs.length > 0 &&
                favs.map((fav) => <option key={fav.id}>{fav.PathName}</option>)}
            </select>
          </div>
          <div className="mt-4">
            How often do you need a bike for this path?
            <p>
              <small>-PLEASE SELECT A RANGE IN THE WEEK-</small>
            </p>
            <DateRange
              ranges={[daysOfWeek.selection]}
              value={daysrange}
              onChange={(item) => setDaysOfWeek({ ...daysOfWeek, ...item })}
              months={1}
              minDate={addDays(new Date(), 0)}
              maxDate={addDays(new Date(), 10)}
              className="rounded"
              showDateDisplay={false}
              rangeColors={["#dc3545", "#ffc107", "#fd7e14"]}
            ></DateRange>
          </div>
        </div>

        <div className="col-4 d-flex flex-column pb-2">
          <BiciPoint
            handleClickOnMap={(bici) => handleClickOnMap(bici, "PickUpStation")}
            handleChange={handleChange}
            station={PickUpStation}
            time={picktime}
            name="picktime"
            stationName="PickUpStation"
          >
            <h5 className="">Starting point</h5>
            <p className="px-4">
              Which is your nearest station to <i className="bcb">start</i> your
              trip?
            </p>
          </BiciPoint>
        </div>
        <div className="col-4 d-flex flex-column pb-2">
          <BiciPoint
            handleClickOnMap={(bici) => handleClickOnMap(bici, "ReturnStation")}
            handleChange={handleChange}
            station={ReturnStation}
            time={retime}
            name="retime"
            stationName="ReturnStation"
          >
            <h5 className="">Ending point</h5>
            <p className="px-4">
              Which is your nearest station to <i className="bcb">end</i> your
              trip?
            </p>
          </BiciPoint>
        </div>
        <div>
          <button type="submit" className="btn btn-danger mt-3 m-auto">
            Add your new path
          </button>
        </div>
      </form>
    </div>
  );
}
