import React, { useState } from 'react';
import "./Question.scss"

function QuestionInput({ onQuestionSubmit }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuestionSubmit(question);
    setQuestion('');
  };

  return (
    <div className="question-input">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionInput;
