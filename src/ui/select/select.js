import React from "react";
import classes from "./select.module.css";

const Select = ({ onChange, label, value, options }) => {
  const htmlFor = `${label}-${Math.random().toFixed(2)}`;
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor} value={value} onChange={onChange}>
        {options.map(({ text, value }, i) => {
          return (
            <option key={i + text} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
