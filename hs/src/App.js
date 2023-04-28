import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
// User Interface
import Home from "./components/home";
import About from "./components/about";
import Search from "./components/search";
import Advertise from "./components/advertise";
import Help from "./components/help";
// Admin interface
import Dashboard from "./admin/components/dashboard";
import Login from "./admin/components/login";
import Settings from "./admin/components/settings";
import Hospitals from "./admin/components/hospitalsList";
import Support from "./admin/components/support";
import Users from "./admin/components/users";
import Analytics from "./admin/components/analytics";
// Admin CRUD components
import UpdateHospital from "./admin/components/updateHospital";
import AddHospital from "./admin/components/addHospital";
import UpdateUsers from "./admin/components/updateUser";
import AddUsers from "./admin/components/addUser";
import UpdateSettings from "./admin/components/updateSettings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/support" element={<Support />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Routes>
        <Route path="/updateHospital/:id" element={<UpdateHospital />} />
        <Route path="/addNewHospital" element={<AddHospital />} />
        <Route path="/updateUsers/:id" element={<UpdateUsers />} />
        <Route path="/addNewUsers" element={<AddUsers />} />
        <Route path="/updateSettings" element={<UpdateSettings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
