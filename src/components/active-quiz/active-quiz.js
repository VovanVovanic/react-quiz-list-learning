import React from 'react'
import AnswerList from './answer-list'
import classes from './active-quiz.module.css'


const ActiveQuiz = ({ answers,
  question,
  quizLength,
  onAnswerClick,
  activeQuestion,
  answerStatus
}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <strong>1. {question}</strong>
        <small>
          {activeQuestion} done from {quizLength} remains
        </small>
      </p>
      <AnswerList
        answers={answers}
        onAnswerClick={onAnswerClick}
        answerStatus={answerStatus}
      />
    </div>
  );
};

export default ActiveQuiz