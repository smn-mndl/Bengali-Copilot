import React from "react";
import "./GeneratedQuestionSection.scss"; // Import your CSS file for styling

function GeneratedQuestionSection({ questions, onClose }) {
  return (
    <div className="question-list">
        <div className="question-content-generated">
          <h2>Question{`${questions?.length ? "s" : ""}`}</h2>
          {onClose && (
            <button className="close-icon" onClick={onClose}>
              X
            </button>
          )}
        </div>
      <ul>
        {questions?.length && questions.map((item, index) => (
          <li key={index}>{item.question}</li>
        ))}
      </ul>
    </div>
  );
}

export default GeneratedQuestionSection;
