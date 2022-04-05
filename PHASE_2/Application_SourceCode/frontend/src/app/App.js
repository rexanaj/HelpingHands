import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import GiveHelpPage from "../pages/giveHelpPage/GiveHelpPage.jsx"
import HomePage from "../pages/homePage/HomePage.jsx";
import GetHelpPage from "../pages/getHelpPage/GetHelpPage";
import { Header } from "../components/header/Header";
////////////////////////////////////

export default function App () {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/giveHelp" element={<GiveHelpPage/>} />
          <Route path="/getHelp" element={<GetHelpPage/>} />
        </Route>
      </Routes>
    </div>
  );
}
