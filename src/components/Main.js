import React, {Component} from 'react';
import axios from 'axios';

class Main extends Component {
  constructor (props) {
    super(props);

    this.state = {
      cryptos: [],
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selected = this.selected.bind(this);
  }

  selected(e, key) {
    e.target.select();
  }

  handleChange(e, key) {
    if (localStorage.getItem("my" + this.state.cryptos[key].name) !== null) {
      localStorage.setItem("my" + this.state.cryptos[key].name, this.state.cryptos[key].ammount);
    }
    let newCryptos = this.state.cryptos;
    newCryptos[key].ammount = e.target.value;
    this.setState({cryptos: newCryptos});
  }

  handleSubmit(e, key) {
    if (localStorage.getItem("my" + this.state.cryptos[key].name) !== null) {
      localStorage.setItem("my" + this.state.cryptos[key].name, this.state.cryptos[key].ammount);
    }
    localStorage.getItem("my" + this.state.cryptos[key].name)
    e.preventDefault();
  }

  componentDidMount () {

    const requestOptions = {
      method: 'GET',
      uriListings: 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      headers: {
        'X-CMC_PRO_API_KEY': '9db6bdb7-fe5b-41e0-88dd-6bb1c45e7a22'
      },
      json: true,
      gzip: true
    }

    this.setState({loading: true});

    const getCryptos = async () => {
      await axios.get(requestOptions.uriListings, requestOptions)
              .then(response => {
                let cryptos = response.data.data;
                this.setState({cryptos: cryptos});
                let getInitialState = () => {
                  let cryptos = this.state.cryptos.map((item) => {
                      item.ammount = 0;
                      return {
                        ...item
                      }
                  });
                  this.setState({cryptos: cryptos});
                  this.state.cryptos.map((item) => {
                    if (localStorage.getItem("my" + item.name) !== null) {
                      let newCryptos = this.state.cryptos;
                      item.ammount = localStorage.getItem("my" + item.name);
                      this.setState({cryptos: newCryptos});
                    }
                    return this.state.cryptos;
                  });

                };
                getInitialState();
              })
              .catch(status => {
                console.log(status);
              });
      await this.setState({loading: false});
    };
    getCryptos();
  }
  
  render() {
    let loading = this.state.loading;
    return (
      <main className="App-main">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Name</th>
              <th>Short name</th> 
              <th>$ Value</th>
              <th>last 24h</th>
              <th>Ammount you own</th>
              <th>$ value of your coin</th>
            </tr>
          </thead>
          <tbody>
            {
            loading ?
              <tr className="App-loader">
                <td colspan="7">Collecting data, please wait...</td>
              </tr>
            :
              Object.keys(this.state.cryptos).map((key) => (
                <tr key={key.toString()}>
                  <td>{Number(key) + 1}</td>
                  <td>{this.state.cryptos[key].name}</td>
                  <td>{this.state.cryptos[key].symbol}</td>
                  <td>{"$ " + this.state.cryptos[key].quote.USD.price.toFixed(2)}</td>
                  <td className={this.state.cryptos[key].quote.USD.percent_change_24h.toFixed(2) < 0 ? 'red' : 'green'}>{this.state.cryptos[key].quote.USD.percent_change_24h.toFixed(2) + " %"}</td>
                  <td>
                    <input type="number" value={this.state.cryptos[key].ammount} onFocus={(e) => this.selected(e, key)} onChange={(e) => this.handleChange(e, key)}></input>
                    <input type="submit" value="Submit" disabled={(this.state.cryptos[key].ammount) <= 0 ? true : false} onClick={(e) => this.handleSubmit(e, key)}></input>
                  </td>
                  <td>{"$ " + (this.state.cryptos[key].quote.USD.price * this.state.cryptos[key].ammount).toFixed(2)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    );
  }
}

export default Main;
