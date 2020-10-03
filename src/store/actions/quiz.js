import axios from "axios";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_FINISH,
  FETCH_QUIZES_START,
  FETCH_QUIZ_SUCCESS,
  ANSWER_STATUS,
  FINISHED_QUIZ,
  CHANGE_QUESTION,
  RETRY_QUIZ,
} from "./action-type";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart);
    try {
      const result = await axios.get(
        "https://react-quiz-df3e9.firebaseio.com/quzes.json"
      );
      const quizes = [];
      Object.keys(result.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `To Test ${i + 1}`,
        });
      });
      dispatch(fetchQuizesFinish(quizes));
    } catch (e) {
      let error = e.response.data.error;
      dispatch(fetchQuizesError(error));
    }
  };
}

export function onQuizLoad(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const result = await axios.get(
        `https://react-quiz-df3e9.firebaseio.com/quzes/${quizId}.json`
      );
      const quiz = result.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      let error = `${e.response.data.error}`;
      dispatch(fetchQuizesError(error));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function onAnswerClick(answerId) {
  return (dispatch, getState) => {
    const { activeQuestion, quiz, answerStatus, results } = getState().quiz;
    const quizElem = quiz[activeQuestion];
    if (answerStatus) {
      const key = Object.keys(answerStatus)[0];
      if (answerStatus[key] === "success") {
        return;
      }
    }
    if (answerId === quizElem.rightAnswerId) {
      if (!results[quizElem.id]) {
        results[quizElem.id] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results));
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(getState().quiz)) {
          dispatch(finishedQuiz());
        } else {
          dispatch(onChangeQuestion(activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[quizElem.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }
  };
}
export function onRetry() {
  return dispatch => {
    dispatch(onQuizRetry())
  }
}
export function onQuizRetry() {
  return {
    type: RETRY_QUIZ
  }
}
export function onChangeQuestion(num) {
  return {
    type: CHANGE_QUESTION,
    num,
  };
}
export function finishedQuiz() {
  return {
    type: FINISHED_QUIZ,
  };
}
export function quizSetState(answerStatus, results) {
  return {
    type: ANSWER_STATUS,
    answerStatus,
    results,
  };
}
export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}
export function fetchQuizesFinish(quizes) {
  return {
    type: FETCH_QUIZES_FINISH,
    quizes,
  };
}
export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}
