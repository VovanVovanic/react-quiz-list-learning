import React from 'react';
import classes from './input.module.css'

const Input = ({label, errorMsg, type, valid, touched, shouldValidate, onChange, placeholder, value }) => {
    const cls = [
        classes.Input
    ]
    const isValid = (valid, touched, shouldValidate) =>{
        return !valid && touched && shouldValidate
    }
    if ((isValid(valid, touched, shouldValidate))) {
      cls.push(classes.invalid);
    }
    const htmlFor = `${type}${Math.random().toFixed(3)}`
    return (
      <div className={cls.join(" ")}>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          id={htmlFor}
          type={type}
          value={value}
          placeholder={placeholder}
          valid={valid}
          touched={touched}
          onChange={onChange}
          shouldValidate={shouldValidate}
        />
        {isValid(valid, touched, shouldValidate) ? <span>{errorMsg}</span> : null}
        
      </div>
    );
}

export default Input