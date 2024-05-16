/* eslint-disable array-callback-return */
import {
  generateQuestion,
  getAnswer,
  getNER,
  getParagraphDetails,
} from "../../api/api-creator";
import { setServiceLoader } from "./appActions";

export const setInputData = (data) => ({
  type: "SET_INPUT_TEXT",
  payload: data,
});

export const setResponseData = (data) => ({
  type: "SET_RESPONSE_DATA",
  payload: data,
});

export const getNERAction = async (dispatch, payload) => {
  dispatch(setServiceLoader(true));
  let response = await getNER(payload);
  // let response = {
  //   1: {
  //     lemma: [
  //       ["ধানমন্ডি"],
  //       ["মঙ্গলবার", "সকাল"],
  //       ["সুদীপ্ত", "দত্ত", "অর্জুন"],
  //       ["পুলিশ"],
  //     ],
  //     ner: ["ধানমন্ডি", "মঙ্গলবার সকালে", "সুদীপ্ত দত্ত অর্জুন", "পুলিশ"],
  //     sentence: {
  //       context:
  //         "রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ",
  //       paragraph: 1,
  //       sentence: 1,
  //     },
  //   },
  //   2: {
  //     lemma: [
  //       [
  //         "পিলখানার",
  //         "বীরশ্রেষ্ঠ",
  //         "নূর",
  //         "মোহাম্মদ",
  //         "স্কুল",
  //         "অ্যান্ড",
  //         "কলেজের",
  //       ],
  //     ],
  //     ner: ["পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের"],
  //     sentence: {
  //       context:
  //         "সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল",
  //       paragraph: 1,
  //       sentence: 2,
  //     },
  //   },
  //   4: {
  //     lemma: [["পুলিশ"], ["গত", "রোববার"], ["অর্জুন"]],
  //     ner: ["পুলিশ", "গত রোববার", "অর্জুন"],
  //     sentence: {
  //       context:
  //         "পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন",
  //       paragraph: 1,
  //       sentence: 4,
  //     },
  //   },
  //   5: {
  //     lemma: [["ঢাকা", "মেডিকেল", "কলেজে"]],
  //     ner: ["ঢাকা মেডিকেল কলেজে"],
  //     sentence: {
  //       context: "অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে",
  //       paragraph: 1,
  //       sentence: 5,
  //     },
  //   },
  //   7: {
  //     lemma: [["প্রদীপ", "কুমারের"], ["অর্জুন"]],
  //     ner: ["প্রদীপ কুমারের", "অর্জুনের"],
  //     sentence: {
  //       context:
  //         "কলেজের ফরেনসিক বিভাগের প্রভাষক প্রদীপ কুমারের ভাষ্য, পানিতে ডুবে অর্জুনের মৃত্যু হয়েছে বলে তাঁরা প্রাথমিকভাবে ধারণা করছেন",
  //       paragraph: 1,
  //       sentence: 7,
  //     },
  //   },
  //   9: {
  //     lemma: [["সকাল"], ["আটটার"], ["ধানমন্ডি", "লেক"], ["পুলিশে"]],
  //     ner: ["সকাল", "আটটার", "ধানমন্ডি লেকে", "পুলিশে"],
  //     sentence: {
  //       context:
  //         "আজ সকাল সাড়ে আটটার দিকে ধানমন্ডি লেকে একজনের লাশ ভাসতে দেখে পুলিশে খবর দেয় সেখানে ঘুরতে আসা কয়েকজন ব্যক্তি",
  //       paragraph: 1,
  //       sentence: 9,
  //     },
  //   },
  //   10: {
  //     lemma: [["পুলিশ"]],
  //     ner: ["পুলিশ"],
  //     sentence: {
  //       context: "এরপর পুলিশ গিয়ে লাশ উদ্ধার করে",
  //       paragraph: 1,
  //       sentence: 10,
  //     },
  //   },
  //   42: {
  //     lemma: [["আবদুর", "রহমান"]],
  //     ner: ["আবদুর রহমান"],
  //     sentence: {
  //       context:
  //         "আমি কিছু ছোট কেনাকাটা করেছি, এবং আবদুর রহমান, রাশিয়ান, সে ইংলিশ এবং ফ্রন্টিয়ার পলিসি সম্পর্কে কথোপকথন শুরু হয়েছিল",
  //       paragraph: 9,
  //       sentence: 42,
  //     },
  //   },
  // };
  dispatch(setServiceLoader(false));
  const data = response.data.response;
  // const data = response;
  let ner = [];

  //paragraph wise data
  // Object.keys(data).map((each) => {
  //   data[each]['lemma'].map(eachLemma=>{
  //     const joinLemma = eachLemma.join(' ');
  //     console.log('joinLemma', joinLemma)
  //   })
  // })

  Object.keys(data).map((each) => {
    data[each]["ner"].map((each2) => {
      ner.push(each2);
    });
  });

  const uniqueNer = [...new Set(ner)];
  let obj = {};
  uniqueNer.map((eachNer) => {
    let tempArr = [];
    Object.keys(data).map((each) => {
      let tempObj = {};
      if (data[each]["ner"].includes(eachNer)) {
        tempObj[each] = data[each]["sentence"]["context"];
        tempObj["paragraph"] = data[each]["sentence"]["paragraph"];
        tempArr.push(tempObj);
      }
    });
    obj[eachNer] = tempArr;
  });
  return dispatch({
    type: "SET_RESPONSE_DATA",
    payload: obj,
  });
};

export const getAnswerAction = async (dispatch, payload) => {
  dispatch(setServiceLoader(true));
  resetAnswerAction(dispatch);
  const response = await getAnswer(payload);
  dispatch(setServiceLoader(false));

  const answerObj = response.data.response;
  const obj = {
    ...payload,
    answer: answerObj.answer,
    percent: answerObj.score,
  };
  return dispatch({
    type: "SET_QUESTION_ANSWER",
    payload: obj,
  });
};

export const generateQuestionAction = async (
  dispatch,
  payload,
  namedEntity
) => {
  dispatch(setServiceLoader(true));
  const response = await generateQuestion(payload);
  dispatch(setServiceLoader(false));

  const question = response.data.response;

  let qstnArr = payload.question.map((each, index) => {
    let tempObj = { context: each, question: question[index].generated_text };
    return tempObj;
  });
  // let qstnArr = [
  //   { context: "context1", question: "question 1" },
  //   { context: "context2", question: "question 2" },
  // ];
  let obj = {};
  obj[namedEntity] = qstnArr;
  return dispatch({
    type: "GENERATE_QUESTION",
    payload: obj,
  });
};

export const setSelectedParagraphTextAction = (text) => ({
  type: "SET_SELECTED_PARAGRAPH_TEXT",
  payload: text,
});

export const setSelectedParagraphAction = async (dispatch, selectedText) => {
  dispatch(setServiceLoader(true));
  const response = await getParagraphDetails(selectedText);
  dispatch(setServiceLoader(false));
  const data = response.data.response;

  return dispatch({
    type: "SET_SELECTED_PARAGRAPH",
    payload: data,
  });
};

export const resetAnswerAction = async (dispatch) =>
  dispatch({
    type: "RESET_ANSWER",
  });
