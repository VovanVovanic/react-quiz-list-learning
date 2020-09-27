import React from 'react'
import classes from './answer-item.module.css'

const AnswerItem = ({ answer, onAnswerClick, answerStatus }) => {
 const { text, id } = answer;
    const cls = [
        classes.AnswerItem,
    ];
    if (answerStatus) {
        cls.push(classes[answerStatus])
    }    
    return (
        <li
            className={cls.join(' ')}
            onClick={()=>onAnswerClick(id)}
        >{text}</li>
    )
}
export default AnswerItem