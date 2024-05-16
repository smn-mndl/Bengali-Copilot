import React, { useEffect, useState } from "react";
import "./Display.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  inputTextSelector,
  responseDataSelector,
} from "../../redux/selectors/dataSelectors";
import RightSection from "./rightSection/rightSection";
import { getNERAction, setSelectedParagraphTextAction } from "../../redux/actions/dataActions";

function DisplayPage() {
  const dispatch = useDispatch()
  const [isParagraphSelected, setIsParagraphSelected] = useState(false);
  const data = useSelector(responseDataSelector);
  const inputText = useSelector(inputTextSelector);
  const paragraphs = inputText.split("\n");
  const paragraphsWithoutLineBreak = paragraphs.join(' ')

  useEffect(() => {
    if (isParagraphSelected) {
      setIsParagraphSelected(false);
    }
  }, []);

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setIsParagraphSelected(true);
      dispatch(setSelectedParagraphTextAction(selectedText))
      const nerPayload = { text: selectedText };
      getNERAction(dispatch, nerPayload);
      console.log(selectedText);
    }
  };
  console.log('isParagraphSelected', isParagraphSelected);

  const [selectedWord, setSelectedWord] = useState(null);

  const handleWordClick = (word) => {
    console.log('word --', word)
    setSelectedWord(word);
    const leftSection = document.getElementById('left-section');
    if (leftSection) {
      const wordElement = leftSection.querySelector(`[data-word="para-${word}"]`);
      if (wordElement) {
        wordElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="display-page">
      <div
        className="left-section"
        onMouseUp={handleTextSelect}
        onTouchEnd={handleTextSelect}
        id="left-section"
      >
        {paragraphs.map((paragraph, index) => (
          <p data-word={`para-${index+1}`} key={index}>{paragraph}</p>
        ))}
      </div>
      <RightSection data={data} onWordClick={handleWordClick} context1 = {paragraphsWithoutLineBreak}/>
    </div>
  );
}

export default DisplayPage;
