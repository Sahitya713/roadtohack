import React from "react";

import { Link } from "react-router-dom";

const MarkerCard = ({ questionTitle, link, locName, points }) => {
  return (
    <div>
      <div>{locName}</div>
      <div>{questionTitle}</div>
      <div>{points}</div>

      <Link to={link}>view</Link>
    </div>
  );
};

export default MarkerCard;
