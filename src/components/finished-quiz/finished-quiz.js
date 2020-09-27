import React from 'react'
import classes from './finished-quiz.module.css'

const FinishedQuiz = ({ quiz, results, onRetry }) => {

  const list = quiz.map((el, i) => {
    const cls = [
      'fa',
      results[el.id] === 'success' ? 'fa-check' : 'fa-times',
      classes[results[el.id]]
    ]
    return (
      <li key = {i}>
        <strong>{`${i + 1}. ${el.question}`}</strong>
        <i className={cls.join(' ')}></i>
      </li>
    )
  })
  const correctAnswers = Object.keys(results).reduce((total, el) => {
    if(results[el] === 'success') {total++}
    return total
  }, 0)
    return (
      <div className={classes.FinishedQuiz}>
        <h2>Well done dude! You did it.</h2>
        <ul>{list}</ul>
        <p>{correctAnswers} correct answers from {quiz.length}.</p>
        <div>
          <button onClick={onRetry}>Retry</button>
        </div>
      </div>
    );
}

export default FinishedQuiz