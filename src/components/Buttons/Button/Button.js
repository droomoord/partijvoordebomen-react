import React from 'react';
import classes from './Button.module.css';

const button = props => {
  return (
    <button className={classes.button} onClick={props.clicked}>
      {props.buttonName}
    </button>
  );
};

export default button;
