import React from 'react'
import classes from './toggle-menu.module.css'

const ToggleMenu = ({ isOpen, onToggle }) => {
 const   cls = [
        classes.ToggleMenu,
        'fa'
    ]
    if (isOpen) {
        cls.push('fa-times')
        cls.push(classes.open);
    }
    else {
        cls.push('fa-bars')
        
  }
  
    return (
      <div>
        <i
          className={cls.join(" ")}
          onClick={onToggle}
        ></i>
      </div>
    );
}

export default ToggleMenu