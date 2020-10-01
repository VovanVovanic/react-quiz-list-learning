import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../ui/loader'
import ErrorMessage from '../../components/error-message'
import axios from 'axios'
import classes from './quiz-list.module.css'

class QuizList extends Component {
  state = {
    quizes: [],
    error: "",
    loading: true,
  };
  onQuizListRender = () => {
    return this.state.quizes.map((el) => {
      return (
        <li key={el.id}>
          <NavLink to={"/quiz/" + el.id}>{el.name}</NavLink>
        </li>
      );
    });
  };

    async componentDidMount() {
        try {
            const result = await axios.get("https://react-quiz-df3e9.firebaseio.com/quzes.json");
            const quizes = []
            Object.keys(result.data).forEach((key, i) => {
                quizes.push({
                    id: key,
                    name: `To Test ${i+1}`
                })
            })
            this.setState({
                loading: false,
                quizes,
                error: ''
            })
        } catch (e) {
          
            this.setState({
              error: `${e.response.status}  ${e.response.statusText}`,
              loading: false,
            });
     }
 }   
    
    render() {
    const error = this.state.error ? (
      <ErrorMessage message={this.state.error} />) : null;  
      const content = this.state.loading ? (<Loader />) : (<ul>{this.onQuizListRender()}</ul>);   
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

export default QuizList