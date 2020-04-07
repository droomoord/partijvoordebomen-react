import React from 'react';
import classes from './Cockpit.module.css';
import Header from '../Header/Header';
import Buttons from '../Buttons/Buttons';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

const cockpit = props => {
  let loggedInMessage = null;
  if (props.isLoggedIn) {
    loggedInMessage = <div className={classes.msg}>You are logged in!</div>;
  }
  return (
    <div className={classes.cockpit}>
      {loggedInMessage}
      <Header />
      <Buttons
        buttonNames={props.buttonNames}
        clicked={props.clicked}
      />
      <Content 
      isAsymmetric={props.isAsymmetric}
      toggleAsymmetric={props.toggleAsymmetric}
      changeNumberOfParagraphs={props.changeNumberOfParagraphs}
      numberOfCollumnsChanged={props.numberOfCollumnsChanged}
      collumns={props.collumns}
      changed={props.changeContentParagraph}
      saveClicked={props.saveClicked}
      cancelClicked={props.cancelClicked}
      content={props.content} 
      isLoggedIn={props.isLoggedIn} />
      <Footer
        isLoggedIn={props.isLoggedIn}
        showLoginFields={props.showLoginFields}
        loginButtonClick={props.loginButtonClick}
        logoutButtonClick={props.logoutButtonClick}
        username={props.username}
        password={props.password}
        changed={props.changed}
        clicked={event => props.clicked(event)}
        submitted={props.submitted}
      />
    </div>
  );
};

export default cockpit;
