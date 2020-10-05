
import React, {Component} from "react";
import BackDrop from '../back-drop'
import { NavLink } from 'react-router-dom'
import classes from "./drawer.module.css";

class Drawer extends Component {
  render() {
    const { isOpen, onMenuClose, isAuthorized } = this.props;
    const  links = [
        { to: "/", label: "Quiz List", exact: true },
        
        
    ];
    if (isAuthorized) {
      links.push({ to: "/quiz-creator", label: "Quiz Creator", exact: false });
      links.push({ to: "/logout", label: "Logout", exact: false });
    }
    else {
      links.push({ to: "/auth", label: "Authentication", exact: false });
    }
    const  list = links.map(({ to, label, exact }, i) => {
        return (
          <li key={i}>
            <NavLink
              to={to}
              exact={exact}
              onClick={() => this.props.onMenuClose()}
              activeClassName={classes.active}
            >
              {label}.
            </NavLink>
          </li>
        );
      });
    
        const cls = [
        classes.Drawer
    ]
    if (!isOpen) {
        cls.push(classes.close)
    }
    return (
      <>
      <nav className={cls.join(' ')}>
        <ul>{list}</ul>
          </nav>
          {isOpen ? <BackDrop onClick={onMenuClose} /> : null}
    </>
    )
  }
}

export default Drawer;
