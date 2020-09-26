import React, {Component} from 'react'
import Layout from './hoc/layout/layout'
import Quiz from './containers/quiz'

class App extends Component {
  render() {
    return (
      <Layout>
        
        <Quiz />
      </Layout>
    )
  }
}

export default App
