import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
// import Users from "./components/Users";
// import User from "./components/User";
import Reservations from "./components/Reservations";
import NewReservationForm from "./components/NewReservationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />}>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/new" element={<NewReservationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*
<li>
  <input type="checkbox" id="mon"/>
	<label for="mon">MON</label>
</li>*/
