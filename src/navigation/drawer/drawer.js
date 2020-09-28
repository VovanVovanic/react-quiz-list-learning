
import React from "react";
import BackDrop from '../back-drop'
import classes from "./drawer.module.css";

const Drawer = ({isOpen, onMenuClose}) => {
    const links = [1, 2, 3]
    const cls = [
        classes.Drawer
    ]
    if (!isOpen) {
        cls.push(classes.close)
    }
    const list = links.map((el, i) => {
        return (
            <li key={i}> Link to {el}.</li>
        )
    })
  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{list}</ul>
          </nav>
          {isOpen ? <BackDrop onClick={onMenuClose} /> : null}
    </>
  );
};

export default Drawer;
