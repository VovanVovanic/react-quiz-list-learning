import { combineReducers } from 'redux'
import {quizesReducer} from './quiz'

export default combineReducers({
    quiz: quizesReducer
})