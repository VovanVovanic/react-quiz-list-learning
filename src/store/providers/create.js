import { ADD_QUIZ_ITEM, ON_QUIZ_CREATED, ON_ERROR } from "../actions/action-type"

const initialState = {
    quiz: [],
    error: ''
}
export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_QUIZ_ITEM:
            return {
                ...state, quiz: [...state.quiz, action.item]
            }
        
        case ON_QUIZ_CREATED: 
            return {
                ...state, quiz: []
            }
        case ON_ERROR: 
            return {
                ...state, error: action.error
            }
        default: return state
    }
}