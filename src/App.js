import React, {Component} from 'react'
import Layout from './hoc/layout/layout'
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/quiz'
import Auth from './containers/auth'
import QuizList from './containers/quiz-list'
import QuizCreator from './containers/quiz-creator'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Layout>
    );
  }
}

export default App
