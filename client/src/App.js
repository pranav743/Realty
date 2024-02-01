import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NewProfile from "./screens/newProfile/newProfile";
import Profile from "./screens/Profile/Profile";
import Upload from "./screens/Upload/Upload";
import Wrapper from "./components/Wrapper";
import RedirectionPage from "./Global/redirection";
import NavBar from "./components/NavBar";
import Property from "./screens/property/Property";
import Dashboard from "./screens/admin/dashboard";
import PropertyMinting from "./screens/PropertyMinting/PropertyMinting";
import Room3D from "./components/room3D";
import PropertyOwners from "./screens/PropertyOwners/PropertyOwners";
import ListProperties from "./screens/ListProperties/ListProperties";

function App() {
  return (
    <Router>
      <NavBar />
      <Wrapper>
        <Routes>
          <Route path={"/login"} exact element={<Login />} />
          <Route path={"/"} exact element={<Home />} />
          <Route path={"/property/:id"} exact element={<Property />} />
          <Route path="/new-profile" exact element={<NewProfile />} />
          <Route path="/user-profile" exact element={<Profile />} />
          <Route path={"/upload"} exact element={<Upload />} />
          <Route path={"/mint-property"} exact element={<PropertyMinting />} />
          <Route path={"/listed-properties"} exact element={<ListProperties />} />
          <Route path={"/error"} exact element={<Error />} />
          <Route path={"/admin/dashboard"} exact element={<Dashboard />} />
          <Route
            path={"/property/owners/:id"}
            exact
            element={<PropertyOwners />}
          />
          <Route path={"/room/3D/:id"} exact element={<Room3D />} />

          <Route
            path="/redirection/:accessToken"
            element={<RedirectionPage />}
          />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
