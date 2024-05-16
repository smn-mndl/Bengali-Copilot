// reducers/dataReducer.js
const initialState = {
  inputText: "",
  response: {},
  questionAnswer: [],
  selectedParagraph: {
    text: "",
    question: "",
    ner: {},
  },
  generatedQuestionSets: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RESPONSE_DATA":
      return {
        ...state,
        response: action.payload,
      };
    case "SET_INPUT_TEXT":
      return {
        ...state,
        inputText: action.payload,
      };
    case "SET_QUESTION_ANSWER":
      const presentQstnAnswrs = JSON.parse(
        JSON.stringify(state.questionAnswer)
      );
      presentQstnAnswrs.push(action.payload);
      return {
        ...state,
        questionAnswer: presentQstnAnswrs,
      };
    case "GENERATE_QUESTION":
      return {
        ...state,
        generatedQuestionSets: action.payload,
      };
    case "SET_SELECTED_PARAGRAPH_TEXT":
      return {
        ...state,
        selectedParagraph: {
          ...state.selectedParagraph,
          text: action.payload,
        },
      };
    case "SET_SELECTED_PARAGRAPH_QUESTION":
      return {
        ...state,
        selectedParagraph: {
          ...state.selectedParagraph,
          question: action.payload,
        },
      };
    case "RESET_ANSWER":
      return {
        ...state,
        questionAnswer: [],
      };
    default:
      return state;
  }
};

export default dataReducer;
