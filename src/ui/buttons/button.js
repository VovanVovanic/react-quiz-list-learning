import React from 'react'
import classes from './button.module.css'


const Button = ({ disabled, onClick, type, children }) => {
    const cls = [
        classes.Button,
        classes[type]
    ]
    return (
        <button className={cls.join(' ')}
        onClick={onClick}
        disabled={disabled}
        >{children}</button>
    )
}
export default Button