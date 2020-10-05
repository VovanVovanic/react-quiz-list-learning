import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_FINISH,
  FETCH_QUIZES_START,
  FETCH_QUIZ_SUCCESS,
  ANSWER_STATUS,
  FINISHED_QUIZ,
  CHANGE_QUESTION,
  RETRY_QUIZ,
} from "../actions/action-type";

const initialState = {
  quizes: [],
  error: "",
  loading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerStatus: null,
  quiz: [],
};

export default function quizesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading:true
      };
    case FETCH_QUIZES_FINISH:
      return {
        ...state,
        loading: false,
        error: "",
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case ANSWER_STATUS:
      return {
        ...state,
        answerStatus: action.answerStatus,
        results: action.results,
      };
    case FINISHED_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case CHANGE_QUESTION:
      return {
        ...state,
        activeQuestion: action.num,
        answerStatus: null,
          };
      case RETRY_QUIZ:
          return {
            ...state,
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerStatus: null,
          };
    default:
      return state;
  }
}
