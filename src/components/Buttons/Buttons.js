import React from 'react';
import Button from './Button/Button';
import classes from './Buttons.module.css';

const buttons = (props) => {
  const buttonClicked = (event) => {
    props.clicked(event);
    document
      .querySelectorAll('button')
      .forEach((button) => button.classList.remove('active'));
    event.target.classList.add('active');
  };

  const buttons = props.buttonNames.map((buttonName, index) => {
    return (
      <Button buttonName={buttonName} clicked={buttonClicked} key={index} />
    );
  });

  return <div className={classes.buttons}>{buttons}</div>;
};

export default buttons;
