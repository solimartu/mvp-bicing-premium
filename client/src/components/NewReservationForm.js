import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file for the calendar
import "react-date-range/dist/theme/default.css"; // theme css file for the calendar
import { DateRange } from "react-date-range"; // library for the calendar
import { addDays } from "date-fns"; // library for the calendar
import { Map, Marker, ZoomControl } from "pigeon-maps"; // library to display the map
import bicistations from "./bicistations.json"; // a list with all the bike stations in Barcelona


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

// to put color to the marker for the map
const [hue, setHue] = useState(0);
const color = `hsl(${hue % 354}deg 70% 54%)`

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
  const handleClickOnMap = (bici) => {
    const nameDeStation = bici.name;
    setNewReservation((state) => ({
      ...state,
      PickUpStation: nameDeStation,
    }));
   };
// the function to click a station and add its name into the input below (2) --i know i need to create a component, wait for it--
   const handleClickOnMap2 = (bici) => {
    const nameDeStation = bici.name;
    setNewReservation((state) => ({
      ...state,
      ReturnStation: nameDeStation,
    }));
   }

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
              {favs.length>0 &&
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
              rangeColors={["#dc3545", "#ffc107", "#fd7e14"]}></DateRange> //the calendar
          </div>
        </div>

        <div className="col-6 d-flex flex-column pb-2">
          <div className="rounded mb-3 p-3 bg-danger text-white d-flex flex-column">
            <h5 className="">Starting point</h5>
            {/* <div className="row">
                <div className="col-6"> */}
            Which is your nearest station to start your trip?
            <div>
              <Map height={300} defaultCenter={[41.390, 2.154]} defaultZoom={11}><ZoomControl />
                {bicistations.map((bici) => (
                <Marker width={15} anchor={[+bici.lat,+bici.lon]} color={color} onClick={() =>handleClickOnMap(bici)} key={bici.id}/>))}
              </Map>
            </div>
            <input
              name="PickUpStation"
              value={PickUpStation}
              onChange={(e) => handleChange(e)}
              className="text-center mt-1 "
              placeholder="Click on a Station and it will give you the address"
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
            <div>
              <Map height={300} defaultCenter={[41.390, 2.154]} defaultZoom={11}><ZoomControl />
                {bicistations.map((bici) => (
                <Marker width={15} anchor={[+bici.lat,+bici.lon]} color={color} onClick={() =>handleClickOnMap2(bici)} key={bici.id}/>))}
              </Map>
            </div>
            <input
              name="ReturnStation"
              value={ReturnStation}
              onChange={(e) => handleChange(e)}
              className="text-center mt-1"
              placeholder="Click on a Station and it will give you the addres"
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
        
      </form>
    </div>
  );
}
