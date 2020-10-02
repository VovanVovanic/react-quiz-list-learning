import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../ui/loader'
import ErrorMessage from '../../components/error-message'
import {} from '../../store/actions/quiz'
import { connect } from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'
import classes from './quiz-list.module.css'

class QuizList extends Component {
  onQuizListRender = () => {
    return this.props.quizes.map((el) => {
      return (
        <li key={el.id}>
          <NavLink to={"/quiz/" + el.id}>{el.name}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes()
 }   
    
    render() {
    const error = this.props.error ? (
      <ErrorMessage message={this.props.error} />) : null;  
      const content = this.props.loading 
        ? (<Loader />)
        : (<ul>{this.onQuizListRender()}</ul>);   
    return (
      <div className={classes.QuizList}>
        <div>
          <h2>Quiz List</h2>
          {error}
          {content}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    error: state.quiz.error
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: ()=>dispatch(fetchQuizes())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList)