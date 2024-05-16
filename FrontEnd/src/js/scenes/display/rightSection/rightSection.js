import React from "react";

import EntitySection from "../NamedEntity";
// import Card from "../Card";
import "./rightSection.scss"
import MainCard from "../MainCard";

const RightSection = (props) => {
  const data = props.data, onWordClick = props.onWordClick;
  return (
    <div className="right-section">
      <EntitySection response={data} onWordClick={onWordClick}/>
      <MainCard context1={props.context1}/>
    </div>
  );
};

export default RightSection;
