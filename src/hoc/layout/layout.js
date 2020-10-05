import React, { Component } from 'react'
import ToggleMenu from '../../navigation/toggleMenu'
import Drawer from '../../navigation/drawer'
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
  onMenuClose = () => {
    this.setState({
      menu: false
    })
  }
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onMenuClose={this.onMenuClose}
          isAuthorized={this.props.isAuthorized}
        />
        <ToggleMenu isOpen={this.state.menu} onToggle={this.onToggle} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout