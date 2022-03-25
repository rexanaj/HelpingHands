import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import ExamplePage from "../pages/examplePage/ExamplePage.jsx";
import HomePage from "../pages/home/HomePage";
////////////////////////////////////

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/example" element={<ExamplePage word="DWEN" />} />
        </Route>
      </Routes>
    </div>
  );
}
