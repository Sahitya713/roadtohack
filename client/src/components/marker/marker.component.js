import React from "react";

import { Link } from "react-router-dom";
import CustomButton2 from "../custom-button2/custom-button2.component";
import "./marker.styles.css";
import { Place } from "@material-ui/icons";

const MarkerCard = ({ questionTitle, link, locName, points, questionType }) => {
  return (
    <div className="marker-container">
      <div>
        <Place style={{ color: "red", fontSize: "20px" }} />
        <span className="marker-locname">{locName}</span>
      </div>

      <div className="title marker-title">{questionTitle}</div>

      <div className="marker-points">{points} points</div>
      <div>
        {questionType === "input" || questionType === "code"
          ? "coding"
          : questionType}{" "}
        Question
      </div>
      {/* <CustomButton2>
        <Link to={link} className="link">
          view
        </Link>
      </CustomButton2> */}
      <Link to={link} className="link">
        view
      </Link>
    </div>
  );
};

export default MarkerCard;
