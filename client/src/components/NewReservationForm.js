import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { Calendar } from "react-date-range";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
// import { Link } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
    ReturnStation: "",
    userId: "1",
    PathName: "",
    Favourite: "0",
    picktime: "",
    retime: "",
    daysrange: "",
  });
  let [error, setError] = useState(null);
  let [favs, setFavs] = useState([]);

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
  const addNewReservation = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/myreservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });
      if (!res.ok) throw new Error("There was an error");
      console.log(res, res.data);
      const data = await res.json();
      //   getReservations();
    } catch (err) {
      console.log(err);
    }
  };
  const [daysOfWeek, setDaysOfWeek] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  });

  //   const position = [51.505, -0.09];

  return (
    <div className="container">
      <form
        onSubmit={(e) => addNewReservation(e)}
        className=" row d-flex bg-dark rounded border text-white p-3"
      >
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center">
            Add a name to your everyday path:
            <input
              name="PathName"
              value={PathName}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. home-codeOp"
              className="text-center rounded m-auto"
            ></input>
          </div>
          <div className="d-flex flex-column justify-content-center">
            Or select one of your favs
            <select value={Favourite} className="m-auto mt-2 mb-2">
              {favs &&
                favs.map((fav) => <option key={fav.id}>{fav.PathName}</option>)}
            </select>
          </div>
          <div className="mt-2">
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
              // disabledDates=
            ></DateRange>
          </div>
        </div>

        <div className="col-6 d-flex flex-column pb-2">
          <div className="rounded mb-3 p-3 bg-danger text-white d-flex flex-column">
            <h5 className="">Starting point</h5>
            {/* <div className="row">
                <div className="col-6"> */}
            Which is your nearest station to start your trip?
            <div>
              {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer> */}
            </div>
            <input
              name="PickUpStation"
              value={PickUpStation}
              onChange={(e) => handleChange(e)}
              className="text-center mt-1 "
              placeholder="Carrer de ..."
            ></input>
            What time are you used to grab your bike?
            <input
              type="time"
              className="text-center mt-1"
              name="picktime"
              value={picktime}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="rounded mb-3 p-3 bg-danger text-white d-flex flex-column">
            <h5 className="">Ending point</h5>
            {/* <div className="row">
                <div className="col-6"> */}
            Which is your nearest station to end your trip?
            <input
              name="ReturnStation"
              value={ReturnStation}
              onChange={(e) => handleChange(e)}
              className="text-center mt-1"
              placeholder="Carrer de ..."
            ></input>
            {/* </div>
                <div className="col-6"> */}
            What time are you used to leave your bike?
            <input
              type="time"
              className="text-center mt-1"
              name="retime"
              value={retime}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div>
            <button type="submit" className="btn btn-danger mt-3 m-auto">
              Add your new path
            </button>
          </div>
        </div>
        {/* <Link
          to="/reservations"
          type="submit"
          className="btn btn-outline-dark mt-3 m-auto"
        >
          Add your new path
        </Link> */}
      </form>
    </div>
  );
}
