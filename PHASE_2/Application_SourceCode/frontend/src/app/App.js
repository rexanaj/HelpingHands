import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import ExamplePage from "../pages/examplePage/ExamplePage.jsx";
import TwitterApiPage from "../pages/twitterApiPage/TwitterApiPage";
import GiveHelpPage from "../pages/giveHelpPage/GiveHelpPage.jsx"
import HomePage from "../pages/homePage/HomePage.jsx";
////////////////////////////////////

export default function App () {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/example" element={<ExamplePage word="DWEN" />} />
          <Route path="/twitter" element={<TwitterApiPage />} />
          <Route path="/giveHelp" element={<GiveHelpPage word="DWEN" />} />
        </Route>
      </Routes>
    </div>
  );
}
