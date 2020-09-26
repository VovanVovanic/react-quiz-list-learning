import React from 'react'
import classes from './answer-item.module.css'

const AnswerItem = ({ answer, onAnswerClick }) => {
    const{text, id} = answer
    return (
        <li
            className={classes.AnswerItem}
            onClick={()=>onAnswerClick(id)}
        >{text}</li>
    )
}

export default AnswerItem