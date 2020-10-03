import React, { Component } from 'react'
import ActiveQuiz from '../../components/active-quiz'
import FinishedQuiz from '../../components/finished-quiz'
import Loader from '../../ui/loader'
import ErrorMessage from '../../components/error-message'
import { connect } from 'react-redux'
import classes from './quiz.module.css'
import { onQuizLoad, onAnswerClick, onRetry } from "../../store/actions/quiz";

class Quiz extends Component {

 componentDidMount() {
    this.props.onQuizLoad(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.onRetry()
  }
  render() {
    const {
      quiz,
      activeQuestion,
      answerStatus,
      isFinished,
      results,
      loading, error
    } = this.props;
    
    const onContentLoad = () => {
      let content
      if (loading && !error || !quiz.length) {
        content = <Loader />;
      }
      else if (isFinished) {
        content = (
          <FinishedQuiz results={results} quiz={quiz} onRetry={this.props.onRetry} />
        );
      }  
      else if (!isFinished && !error && !loading) {
        content = (
          <>
            <h2>Answer all questions</h2>
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={this.props.onAnswerClick}
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
function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerStatus: state.quiz.answerStatus,
    error: state.quiz.error,
    loading: state.quiz.loading,
    quiz: state.quiz.quiz
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onQuizLoad: (quizId) => dispatch(onQuizLoad(quizId)),
    onAnswerClick: (answerId) => dispatch(onAnswerClick(answerId)),
    onRetry: ()=> dispatch(onRetry())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)