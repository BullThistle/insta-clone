import React, { Component } from 'react';
import logo from './logo.svg';
import { Container } from 'semantic-ui-react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

const client = new ApolloClient({
  uri: 'http://localhost:5000'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container center>
          <Header />
          <Post
            nickname="Rafa"
            caption="Look at dis here owl"
            image="https://cdn.pixabay.com/photo/2018/02/26/21/04/owl-3184032_1280.jpg"
          />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
