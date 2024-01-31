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
import PropertyListing from "./screens/PropertyListing/PropertyListing";

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
          <Route path={"/list-property"} exact element={<PropertyListing />} />
          <Route path={"/error"} exact element={<Error />} />

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
