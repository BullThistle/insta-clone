import React, { Component } from 'react';
import logo from './logo.svg';
import { Container } from 'semantic-ui-react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container center>
          <Header />
          <Posts />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
