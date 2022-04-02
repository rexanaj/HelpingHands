import React from "react";
import { startButton } from "./components/Button";

export default function HomePage() {
  return (
    <div className="HomePage">
      <startButton className="startButton" onClick={() => {
        console.log("Give Help")}} 
        type="button"
      >
        Give Help
      </startButton>
    </div>
  );
}
