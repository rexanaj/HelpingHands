import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import HomePage from "../pages/home/HomePage";
import NgoCardsGrid from "../components/NgoCardsGrid/NgoCardsGrid.jsx";
import GiveHelpPage from "../pages/giveHelpPage/GiveHelpPage.jsx"
import { Header } from "../components/header/Header";
////////////////////////////////////

export default function App () {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/example" element={<ExamplePage word="DWEN" />} />
          <Route path="/ngos" element={<NgoCardsGrid />} />
          <Route path="/giveHelp" element={<GiveHelpPage word="DWEN" />} />
        </Route>
      </Routes>
    </div>
  );
}
