import React from 'react'
import AnswerItem from '../answer-item'
import classes from './answer-list.module.css'

const AnswerList = ({ answers, onAnswerClick, answerStatus }) => {
    const list = answers.map((answer, i) => {
        return (
          <AnswerItem
            key={i}
            answer={answer}
            onAnswerClick={onAnswerClick}
            answerStatus={answerStatus ? answerStatus[answer.id] : null}
          />
        );
        
    })
    return (
        <ul
        className={classes.AnswerList}>
        {list}
        </ul>
    )
}
export default AnswerList