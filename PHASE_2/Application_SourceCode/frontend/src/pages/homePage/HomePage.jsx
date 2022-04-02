import React from "react";
import { FrontPageButton } from "../../components/frontPageButtons/FrontPageButton";

export default function HomePage () {
  return (
    <div className="HomePage">
      <FrontPageButton buttonText="This is my button text" buttonOnClick={() => { console.log("Give help") }} />
    </div>
  );
}
