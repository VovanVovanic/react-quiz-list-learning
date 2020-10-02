import React, { Component } from 'react'
import ActiveQuiz from '../../components/active-quiz'
import FinishedQuiz from '../../components/finished-quiz'
import Loader from '../../ui/loader'
import ErrorMessage from '../../components/error-message'
import axios from 'axios'
import classes from './quiz.module.css'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerStatus: null,
    error: '',
    loading: true,
    quiz: [],
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
  async componentDidMount() {
    try {
      const result = await axios.get(`https://react-quiz-df3e9.firebaseio.com/quzes/${this.props.match.params.id}.json`)
      this.setState({
        quiz: result.data,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerStatus: null,
        error: "",
        loading: false,
      });

    } catch (e) {
      console.log(e.response);
      this.setState({
        error: `${e.response.data.error}`,
        loading: false,
      });
    }
  }
  render() {
    const {
      quiz,
      activeQuestion,
      answerStatus,
      isFinished,
      results,
      loading, error
    } = this.state;
    
    const onContentLoad = () => {
      let content
      if (loading && !error) {
        content = <Loader />;
      }
      else if (isFinished) {
        content = (
          <FinishedQuiz results={results} quiz={quiz} onRetry={this.onRetry} />
        );
      }  
      else if (!isFinished && !error && !loading) {
        content = (
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
        );
      }else{content = <ErrorMessage message={error} />;}
        
        return content;
    }
    return (
      <div className={classes.Quiz}>
        <h1>Quiz</h1>
        <div className={classes.QuizWrapper}>
          {onContentLoad()}
        </div>
      </div>
    );
  }
}
export default Quiz