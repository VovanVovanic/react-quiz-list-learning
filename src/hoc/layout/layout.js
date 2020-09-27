import React, { Component } from 'react'
import ToggleMenu from '../../navigation/toggleMenu'
import classes from './layout.module.css'

class Layout extends Component {
  state = {
    menu: false
  }
  onToggle = () => {
    this.setState({
      menu: !this.state.menu
    })
  }
  render() {
    return (
      <div className={classes.Layout}>
        <main>
          <ToggleMenu
            isOpen={this.state.menu}
            onToggle={this.onToggle}/>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout