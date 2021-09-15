import React from "react";

const MemberScore = ({ member }) => {
  const { displayName, totalPoints, questions } = member;
  return (
    <div>
      <span>{displayName}</span>
      <span>{totalPoints}</span>
      {questions.map((question, idx) => (
        <div key={idx}>
          <span>{question.title}</span>
          <span>{question.points}</span>
        </div>
      ))}
    </div>
  );
};

export default MemberScore;
