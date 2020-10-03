import { combineReducers } from 'redux'
import createReducer from './create'
import {quizesReducer} from './quiz'

export default combineReducers({
    quiz: quizesReducer,
    create: createReducer
})