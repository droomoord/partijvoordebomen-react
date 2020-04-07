import React, { Component } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';
import config from '../config/config';
import classes from './App.module.css';
import axios from 'axios';

class App extends Component {
  state = {
    buttons: [''],
    content: {
      category: '',
      paragraphs: [],
      collumns: 2,
      asymmetric: false,
    },
    showLoginFields: false,
    username: '',
    password: '',
    isLoggedIn: false,
  };

  getButtonNames = async () => {
    try {
      const getButtons = await axios.get(`${config.apiUrl}/buttons`);
      this.setState({
        buttons: getButtons.data.buttons,
      });

      const key = this.state.buttons[0];
      const getFirstButtonContent = await axios.get(
        `${config.apiUrl}/content/${key}`
      );
      const content = getFirstButtonContent.data.content;
      document.querySelector('button').classList.add('active');
      this.setState({
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  loginClick = () => {
    this.setState((prevState) => {
      return {
        showLoginFields: !prevState.showLoginFields,
      };
    });
  };

  logoutClick = () => {
    this.setState({
      isLoggedIn: false,
    });
    document.documentElement.scrollTop = 0;
  };

  changedHandler = (event) => {
    if (event.target.placeholder === 'username') {
      this.setState({
        username: event.target.value,
      });
    }
    if (event.target.placeholder === 'password') {
      this.setState({
        password: event.target.value,
      });
    }
  };

  clickHandler = async (event) => {
    try {
      document.documentElement.scrollTop = 0;
      const key = event.target.innerText;
      const apiCall = await axios.get(`${config.apiUrl}/content/${key}`);
      const content = apiCall.data.content;
      this.setState({
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = async () => {
    try {
      if (this.state.username === '' || this.state.password === '') {
        alert('please give a username and password');
        return;
      }

      const apiCall = await axios.post(`${config.apiUrl}/login`, {
        username: this.state.username,
        password: this.state.password,
      });

      const isLoggedIn = apiCall.data.isLoggedIn;

      this.setState({
        isLoggedIn,
      });

      if (this.state.isLoggedIn) {
        document.documentElement.scrollTop = 0;
      } else {
        alert('Wrong username and/or password');
        return;
      }

      this.setState({
        username: '',
        password: '',
        showLoginFields: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateContent = () => {
    alert('saved!');
    const update = async () => {
      try {
        await axios.put(`${config.apiUrl}/content`, {
          content: this.state.content,
        });
      } catch (error) {
        console.log(error);
      }
    };
    update();
  };

  dontUpdateContent = async () => {
    try {
      const key = this.state.content.category;
      const apiCall = await axios.get(`${config.apiUrl}/content/${key}`);
      const content = apiCall.data.content;
      this.setState({
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeContentParagraph = (event, index) => {
    const content = { ...this.state.content };
    content.paragraphs[index] = event.target.value;
    this.setState({
      content,
    });
  };

  changeContentCategory = (event) => {
    const content = { ...this.state.content };
    content.category = event.target.value;
    this.setState({
      content,
    });
  };

  changeNumberOfCollumns = (event) => {
    const collumns = event.target.value;
    const content = { ...this.state.content };
    content.collumns = collumns;
    this.setState({
      content,
    });
  };

  numberOfParagraphsHandler = (event, add) => {
    const content = { ...this.state.content };

    if (add) {
      content.paragraphs.push('');
    }

    if (!add) {
      content.paragraphs.splice(-1, 1);
    }

    this.setState({
      content,
    });
  };

  toggleAsymmetricHandler = () => {
    const content = { ...this.state.content };
    content.asymmetric = !this.state.content.asymmetric;
    this.setState({
      content,
    });
  };

  render() {
    return (
      <div className={classes}>
        <Cockpit
          isAsymmetric={this.state.content.asymmetric}
          toggleAsymmetric={this.toggleAsymmetricHandler}
          changeNumberOfParagraphs={this.numberOfParagraphsHandler}
          numberOfCollumnsChanged={this.changeNumberOfCollumns}
          collumns={this.state.content.collumns}
          headerChanged={this.changeContentCategory}
          changeContentParagraph={this.changeContentParagraph}
          saveClicked={this.updateContent}
          cancelClicked={this.dontUpdateContent}
          isLoggedIn={this.state.isLoggedIn}
          showLoginFields={this.state.showLoginFields}
          loginButtonClick={this.loginClick}
          logoutButtonClick={this.logoutClick}
          username={this.state.username}
          password={this.state.password}
          changed={(event) => this.changedHandler(event)}
          buttonNames={this.state.buttons}
          clicked={(event) => this.clickHandler(event)}
          submitted={this.submitHandler}
          content={this.state.content}
        />
      </div>
    );
  }
  componentDidMount() {
    this.getButtonNames();
  }
}

export default App;
