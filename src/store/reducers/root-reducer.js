import { combineReducers } from 'redux'
import authReducer from './auth'
import createReducer from './create'
import quizesReducer from './quiz'

export default combineReducers({
    quiz: quizesReducer,
    create: createReducer,
    auth: authReducer
})