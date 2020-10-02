import axios from "axios";
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_FINISH, FETCH_QUIZES_START } from './action-type'

export function fetchQuizes() {
    return async (dispatch) => {
      dispatch(fetchQuizesStart)
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
        dispatch(fetchQuizesFinish(quizes))
    } catch (e) {
        let error = e.response.data.error
        dispatch(fetchQuizesError(error));
    }
  };
}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizesFinish(quizes) {
    return {
        type: FETCH_QUIZES_FINISH,
        quizes
    }
}
export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}