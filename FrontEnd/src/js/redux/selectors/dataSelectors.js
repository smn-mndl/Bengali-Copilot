import { createSelector } from "@reduxjs/toolkit";

export const dataReducerSelector = (state) => state["dataReducer"];

export const responseDataSelector = createSelector(
  [dataReducerSelector],
  (state) => state.response || {}
);

export const inputTextSelector = createSelector(
  [dataReducerSelector],
  (state) => state.inputText || ""
);

export const selectedParagraphTextSelector = createSelector(
  [dataReducerSelector],
  (state) => state.selectedParagraph.text || {}
);

export const generatedQuestionSetsSelector = createSelector(
  [dataReducerSelector],
  (state) => state.generatedQuestionSets || {}
);

export const getAnswerSelector = createSelector(
  [dataReducerSelector],
  (state) => {
    const stateVal = state.questionAnswer
    return stateVal[stateVal.length-1] || {}
  }
);