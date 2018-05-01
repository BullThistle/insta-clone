import React, { Component } from 'react';
import logo from './logo.svg';
import { Container } from 'semantic-ui-react';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

class App extends Component {
  render() {
    return (
      <Container center>
        <Header />
        <Post
          nickname="Rafa"
          caption="Look at dis here owl"
          image="https://cdn.pixabay.com/photo/2018/02/26/21/04/owl-3184032_1280.jpg"
        />
      </Container>
    );
  }
}

export default App;
