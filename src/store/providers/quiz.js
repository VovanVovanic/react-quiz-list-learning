import { FETCH_QUIZES_ERROR, FETCH_QUIZES_FINISH, FETCH_QUIZES_START } from '../actions/action-type'
const initialState = {
  quizes: [],
  error: "",
  loading: true,
};

export function quizesReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_QUIZES_START: 
            return {
                ...state
            }
        case FETCH_QUIZES_FINISH:
            return {
                ...state, loading: false, error: '', quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default: return state
    }
}