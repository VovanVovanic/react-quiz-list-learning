import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import classes from './quiz-list.module.css'

class QuizList extends Component {

    onQuizListRender = () => {
        return [1, 2, 3].map((el, i) => {
            return (
              <li key={i}>
                <NavLink to={"/quiz/" + { el }}>Test {el}</NavLink>
              </li>
            );
        })
    }

    render() {
        return (
            <div className={classes.QuizList}><h2>Quiz List</h2>
                <ul>{this.onQuizListRender()}</ul>
            </div>
        )
    }
}

export default QuizList