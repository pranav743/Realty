import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NewProfile from "./screens/newProfile/newProfile";
import Profile from "./screens/Profile/Profile";
import BottomNav from "./components/bottomNav";
import Wrapper from "./components/Wrapper";
import RedirectionPage from "./Global/redirection";

function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path={"/login"} exact element={<Login />} />
          <Route path={"/"} exact element={<Home />} />
          <Route path="/new-profile" exact element={<NewProfile />} />
          <Route path="/user-profile" exact element={<Profile />} />
          <Route component={BottomNav}>
            {/* <Route path="/home" exact component={HomePage} /> */}
            {/* <Route path="/find-donor" exact component={FindDonorPage} /> */}
            {/* <Route path="/request-donor" exact component={RequestDonorPage} /> */}
          </Route>
          <Route
            path="/redirection/:accessToken"
            element={<RedirectionPage />}
          />
        </Routes>
      </Wrapper>
      <BottomNav />
    </Router>
  );
}

export default App;
