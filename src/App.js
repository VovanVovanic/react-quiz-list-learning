import React, {Component} from 'react'
import Layout from './hoc/layout/layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {autoLogin} from './store/actions/auth'
import Quiz from './containers/quiz'
import Auth from './containers/auth'
import QuizList from './containers/quiz-list'
import Logout from './containers/logout'
import QuizCreator from './containers/quiz-creator'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to= '/' />
      </Switch>
    );
    if (this.props.isAuthorized) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout isAuthorized={this.props.isAuthorized}>
      {routes}
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token 
  }
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: ()=>dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); 
