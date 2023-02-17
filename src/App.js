import "./App.css";
import Booking from "./components/Booking";
import { Routes, Route } from "react-router-dom";
import Info from "./components/Info";
import Admin from "./components/Admin";
import Navigation from "./components/Navigation";
import Event from "./components/Event";

function App() {
  
  
  
  return (
    <>
      <Navigation />
      <Routes>
        
        <Route path="/" element={<Booking />} />
        {/* <Route path="/event" element={<Event />}/>  */}
        <Route path="/info" element={<Info />} />
        <Route path="/admin-panel" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
