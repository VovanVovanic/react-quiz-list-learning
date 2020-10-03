import axios from 'axios'
import { ADD_QUIZ_ITEM, ON_QUIZ_CREATED, ON_ERROR } from "./action-type";

export function addQuizItem(item) {
        return {
            type: ADD_QUIZ_ITEM,
            item
    }
}
export function createQuiz() {
    return async (dispatch, getState) => {
    try {
      await axios.post(
        "https://react-quiz-df3e9.firebaseio.com/quzes.json",
        getState().create.quiz
        );
        dispatch(onQuizCreated())
    } catch (e) {
        let error = `${e.response.data.error}`;
        console.log(error)
        dispatch(onError(error))
    }
    }
}
    
export function onQuizCreated() {
    return {
        type: ON_QUIZ_CREATED
    }
}
export function onError(error) {
    return {
        type: ON_ERROR,
        error
    }
}