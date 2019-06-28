import React, {Component} from 'react';
import './App.scss';
import Main from './components/Main'

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loadingInfo: "",
      storage: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, key) {
    let newCryptos = this.state.cryptos;
    newCryptos[key].ammount = e.target.value;
    this.setState({cryptos: newCryptos});
  }

  handleSubmit(e, key) {
    localStorage.setItem("my" + this.state.cryptos[key].name, this.state.cryptos[key].ammount);
    e.preventDefault();
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React cryptocurrency tracking app</h2>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
