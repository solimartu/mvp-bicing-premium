import React, { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"; // library to display the map
import bicistations from "./bicistations.json"; // a list with all the bike stations in Barcelona

export default function BiciPoint({
  handleClickOnMap,
  station,
  time,
  handleChange,
  name,
  stationName,
  children,
}) {
  // to put color to the marker for the map
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 354}deg 70% 54%)`;
  return (
    <div className="rounded mb-3 p-3 bg-danger text-white d-flex flex-column">
      {children}
      <div>
        <Map height={300} defaultCenter={[41.39, 2.154]} defaultZoom={11}>
          <ZoomControl />
          {bicistations.map((bici) => (
            <Marker
              width={15}
              anchor={[+bici.lat, +bici.lon]}
              color={color}
              onClick={() => handleClickOnMap(bici)}
              key={bici.id}
            />
          ))}
        </Map>
      </div>
      <input
        name={stationName}
        value={station}
        onChange={(e) => handleChange(e)}
        className="text-center mt-1 tiny"
        placeholder="Click on a Station and it will give you the address"
      ></input>
      What time?
      <input
        type="time"
        className="text-center mt-1"
        name={name}
        value={time}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
