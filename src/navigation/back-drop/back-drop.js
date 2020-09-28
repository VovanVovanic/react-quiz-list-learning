import React from 'react'
import classes from './backdrop.module.css'

const BackDrop = ({onClick }) => {
    return (
        <div className={classes.BackDrop} onClick={onClick}></div>
    )
}

export default BackDrop