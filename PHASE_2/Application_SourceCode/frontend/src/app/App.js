import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import HomePage from "../pages/home/HomePage";
import { Header } from "../components/header/Header";
import NgoCardsGrid from "../components/NgoCardsGrid/NgoCardsGrid.jsx";
import GiveHelpPage from "../pages/giveHelpPage/GiveHelpPage.jsx"
import GetHelpPage from "../pages/getHelpPage/GetHelpPage";
////////////////////////////////////

export default function App () {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/giveHelp" element={<GiveHelpPage />} />
          <Route path="/getHelp" element={<GetHelpPage />} />
          <Route path="/ngos" element={<NgoCardsGrid />} />
        </Route >
      </Routes >
    </div >
  );
}
