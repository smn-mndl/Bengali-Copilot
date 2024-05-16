import React, { useState } from "react";

import CustomButton from "../../../components/custom-button/CustomButton";
import Card from "../Card";
import "./questionAnswerSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { generateQuestionAction, resetAnswerAction } from "../../../redux/actions/dataActions";
import GeneratedQuestionSection from "./GeneratedQuestionSection";
import { generatedQuestionSetsSelector } from "../../../redux/selectors/dataSelectors";

const QuestionAnswerSect = ({ context, namedEntity }) => {
  const [showQuestionCard, setShowQuestionCard] = useState(false);
  const [showAnswerCard, setShowAnswerCard] = useState(false);

  const dispatch = useDispatch();

  const questionsSet = useSelector(generatedQuestionSetsSelector);

  const handleGenerateQuestion = (key) => {
    if (key === "ask") {
      setShowQuestionCard(true);
      if (showAnswerCard) {
        setShowAnswerCard(false);
        resetAnswerAction(dispatch)
      }
    } else {
      if (showQuestionCard) {
        setShowQuestionCard(false);
      }
      setShowAnswerCard(true);
      // Logic to generate question
      generateQuestionAction(dispatch, context, namedEntity);
    }
  };
  return (
    <>
      <div className="question-answer-sect">
        <CustomButton onClick={() => handleGenerateQuestion("generate")}>
          Generate Question
        </CustomButton>
        <CustomButton onClick={() => handleGenerateQuestion("ask")}>
          Ask Question
        </CustomButton>
      </div>
      {showQuestionCard ? (
        <Card
          context1={context?.question[0] || ''}
          onClose={() => {
            setShowQuestionCard(false);
          }}
          mainCard={false}
        />
      ) : null}
      {showAnswerCard ? (
        <GeneratedQuestionSection
          questions={questionsSet[namedEntity]}
          onClose={() => {
            setShowAnswerCard(false);
          }}
        />
      ) : null}
    </>
  );
};

export default QuestionAnswerSect;
