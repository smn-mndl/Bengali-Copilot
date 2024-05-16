import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Card.scss"; // Import your CSS file for styling
import { getAnswerAction } from "../../redux/actions/dataActions";
import { getAnswerSelector, selectedParagraphTextSelector } from "../../redux/selectors/dataSelectors";

function Card({ onClose, context1, mainCard = true}) {
  // const mainPage = mainCard ? true: false;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const context = useSelector(selectedParagraphTextSelector);
  const answerSelector = useSelector(getAnswerSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    const QA_input = {
      question: question,
      context: context1 ? context1 : context,
    };
    getAnswerAction(dispatch, QA_input);
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="question-content">
          <h2>Ask a Question</h2>
          {onClose && (
            <button className="close-icon" onClick={onClose}>
              X
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {answerSelector?.answer && !mainCard && question && ( //remove quuestion
          <div className="answer-display">
            <h2>Answer</h2>
            <p>{answerSelector?.answer}</p>
            {/* <p>Probability of answer being correct - {(Number(answerSelector?.percent) * 100).toFixed(2)}%</p> */}
          </div>
        )}
        {answerSelector?.answer && mainCard && question && (
          <div className="answer-display">
          <h2>Answer</h2>
          {/* <p>{answerSelector?.answer}{` (${(Number(answerSelector?.percent) * 100).toFixed(2)}% correct)`}</p> */}
        </div>
        )}
      </div>
    </div>
  );
}

export default Card;
