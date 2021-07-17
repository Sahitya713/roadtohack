import React from "react";
// import { connect } from "react-redux";
// import { selectCurrQuestion } from "../../redux/question/question.selectors";

const InputOptions = ({ question }) => {
  //   console.log(question);
  const { sampleInput } = question;
  return <div>{sampleInput}</div>;
};

export default InputOptions;
