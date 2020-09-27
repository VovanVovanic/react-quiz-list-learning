import React, { Component } from 'react'
import ActiveQuiz from '../../components/active-quiz'
import FinishedQuiz from '../../components/finished-quiz'
import classes from './quiz.module.css'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerStatus: null,
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
          { text: "Vlad", id: 3 },
          { text: "Tom", id: 4 },
        ],
      },
     
    ],
  };
  onAnswerClick = (answerId) => {
    const { activeQuestion, quiz, answerStatus, results } = this.state;
    const currentQuestion = quiz[activeQuestion];
    if (answerStatus) {
      const key = Object.keys(answerStatus)[0];
      if (answerStatus[key] === "success") {
        return;
      }
    }
    if (answerId === currentQuestion.rightAnswerId) {
      if (!results[currentQuestion.id]) {
        results[currentQuestion.id] = "success";
        this.setState({
          results,
        });
      }
      this.setState({
        answerStatus: { [answerId]: "success" },
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished(activeQuestion, quiz)) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: activeQuestion + 1,
            answerStatus: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[currentQuestion.id] = "error";
      this.setState({
        answerStatus: { [answerId]: "error" },
        results,
      });
    }
  };
  isQuizFinished = (a, b) => {
    return a + 1 === b.length;
  };
  onRetry = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerStatus: null,
    });
  };
  render() {
    const {
      quiz,
      activeQuestion,
      answerStatus,
      isFinished,
      results,
    } = this.state;
    console.log(results);
    return (
      <div className={classes.Quiz}>
        <h1>Quiz</h1>
        <div className={classes.QuizWrapper}>
          {isFinished ? (
            <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={this.onRetry}
            />
          ) : (
            <>
              <h2>Answer all questions</h2>
              <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                onAnswerClick={this.onAnswerClick}
                quizLength={quiz.length}
                activeQuestion={activeQuestion + 1}
                answerStatus={answerStatus}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Quiz