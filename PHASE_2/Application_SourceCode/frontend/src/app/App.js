import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

/////////// COMPONENTS /////////////
import ExamplePage from "../pages/examplePage/ExamplePage.jsx";
import HomePage from "../pages/home/HomePage";
import NgoCardFront from "../components/NgoCard/NgoCardFront.jsx";
import FlipCard from "../components/FlipCard/FlipCard.jsx";
////////////////////////////////////

const cardDetails = {
  name: "Malaria Consortium",
  type: "charity",
  url: "https://www.malariaconsortium.org/",
  mission:
    "We explore beyond current practice, to try out innovative ways – through research, implementation and policy development – to achieve effective and sustainable disease management and control. ",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Malaria_Consortium.svg/375px-Malaria_Consortium.svg.png",
  image:
    "https://www.malariaconsortium.org/gallery-image/width-1280/05111147-68-uganda2013inscalevhtalinaitwestephentinefrank.jpg",
  rating: 5,
  keywords: [
    "malaria",
    "pneumonia",
    "diarrhoea",
    "dengue",
    "tropical diseases",
  ],
  locations: [
    "ethiopia",
    "mozambique",
    "nigeria",
    "south sudan",
    "uganda",
    "burkina faso",
    "chad",
    "cambodia",
    "myanmar",
    "thailand",
    "togo",
  ],
  num_active_locations: 3,
  launch_year: 2003,
  quote:
    "When my own baby boy got sick, I used the skills I had learnt from the training… saved his life.",
};

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/">
          <Route index element={<HomePage />} />
          <Route path="/example" element={<ExamplePage word="DWEN" />} />
          <Route
            path="/ngos"
            element={<NgoCardFront cardDetails={cardDetails} />}
          />
          <Route
            path="/flip"
            element={<FlipCard cardDetails={cardDetails} />}
          />
        </Route>
      </Routes>
    </div>
  );
}
