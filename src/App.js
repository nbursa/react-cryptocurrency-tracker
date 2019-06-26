import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      cryptos: []
    };
  }

  componentDidMount () {
    const requestOptions = {
      method: 'GET',
      uri: 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '9db6bdb7-fe5b-41e0-88dd-6bb1c45e7a22'
      },
      json: true,
      gzip: true
    };

    axios.get(requestOptions.uri, requestOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <main className="App-main">Everything is fine!</main>
        <footer className="App-footer"></footer>
      </div>
    );
  }
}

export default App;
