import React from 'react'
import classes from './error-message.module.css'

const ErrorMessage = ({ message }) => {
    return (
      <div className={classes.ErrorMessage}>
        <div>
          <h2>{`Something is wrong. Error code: ${message}`}</h2>
        </div>
      </div>
    );
}

export default ErrorMessage