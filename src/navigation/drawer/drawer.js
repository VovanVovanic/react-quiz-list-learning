
import React, {Component} from "react";
import BackDrop from '../back-drop'
import {NavLink} from 'react-router-dom'
import classes from "./drawer.module.css";

class Drawer extends Component {
  links = [
    { to: "/", label: "Quiz List", exact: true },
    { to: "/auth", label: "Authentication", exact: false },
    { to: "/quiz-creator", label: "Quiz Creator", exact: false },
  ];
     list = this.links.map(({to, label, exact}, i) => {
        return (
          <li key={i}>
            <NavLink
              to={to}
              exact={exact}
              onClick={()=>this.props.onMenuClose()}
            activeClassName={classes.active}>
              {label}.</NavLink>
          </li>
        );
    })


  render() {
    const { isOpen, onMenuClose } = this.props
    
        const cls = [
        classes.Drawer
    ]
    if (!isOpen) {
        cls.push(classes.close)
    }
    return (
      <>
      <nav className={cls.join(' ')}>
        <ul>{this.list}</ul>
          </nav>
          {isOpen ? <BackDrop onClick={onMenuClose} /> : null}
    </>
    )
  }
}
export default Drawer;
