import { questionTypes } from "./question.types";

const INITIAL_STATE = {
  questions: [
    {
      question: "hey this is the input format question",
      location: "school",
      title: "Input Qn",
      slug: "input-qn",
      points: 5,
      questionType: questionTypes.INPUT,
      sampleInput: "Hey hey so this is like the smaple input yehh",
      sampleOutput: "output wooho",
      input: "0373",
      correctAnswer: 1033,
    },
    {
      question: "question 2, this is a mcq question",
      location: "factory",
      title: "MCQ Qn",
      slug: "mcq-qn",
      points: 5,
      questionType: questionTypes.MCQ,
      options: [
        {
          type: "image",
          option:
            "https://live.staticflickr.com/2233/2435161563_d1367895e7_c.jpg",
          correct: false,
        },
        {
          type: "text",
          option: "option 2",
          correct: false,
        },
        {
          type: "text",
          option: "option 3",
          correct: true,
        },
        {
          type: "text",
          option: "option 4",
          correct: false,
        },
      ],
    },
    {
      question: "question 3, this is a msq question",
      image: "https://live.staticflickr.com/2233/2435161563_d1367895e7_c.jpg",
      location: "hospital",
      title: "MSQ Qn",
      slug: "msq-qn",
      points: 5,
      questionType: questionTypes.MSQ,
      options: [
        {
          type: "text",
          option: "10883",
          correct: false,
        },
        {
          type: "text",
          option: "option 2",
          correct: false,
        },
        {
          type: "text",
          option: "option 3",
          correct: true,
        },
        {
          type: "text",
          option: "option 4",
          correct: false,
        },
      ],
    },
  ],
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default questionReducer;
