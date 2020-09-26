import React, { Component } from 'react'
import ActiveQuiz from '../../components/active-quiz'
import classes from './quiz.module.css'

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        question: "How are you?",
        rightAnswerId: 1,
        id: 1,
        answers: [
          { text: "I am fine", id: 1 },
          { text: "I feel upset", id: 2 },
          { text: "I am happy!", id: 3 },
          { text: "Could be better", id: 4 },
        ],
      },
      {
        question: "What is your name?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: "Mike", id: 1 },
          { text: "Anna", id: 2 },
          { text: "Vlad!", id: 3 },
          { text: "Jama", id: 4 },
        ],
      },
    ],
  };
  onAnswerClick = (answerId) => {
      this.setState({
        activeQuestion: this.state.activeQuestion + 1
    })
  };
  render() {
    const { quiz, activeQuestion } = this.state;
    return (
      <div className={classes.Quiz}>
        <h1>Quiz</h1>
        <div className={classes.QuizWrapper}>
          <h2>Answer all questions</h2>
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={this.onAnswerClick}
            quizLength={quiz.length}
            activeQuestion={activeQuestion + 1}
          />
        </div>
      </div>
    );
  }
}
export default Quiz