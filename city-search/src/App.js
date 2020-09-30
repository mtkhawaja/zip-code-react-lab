import React, { Component } from 'react';
import './App.css';


function CitySearchField(props) {
  return (
    <div>
      <label> City: 
        <input type="text" id="city" name="city" onChange={props.cityChanged} value={props.cityValue}/>
      </label>
    </div>
  );
}

function Entry(props){
  return (
    <div> 
      <p> <strong>Zip: {props.count}:&nbsp;&nbsp;&nbsp;&nbsp;</strong> {props.zip} </p>
    </div>
  );
}

class App extends Component {
  state = {
    value: '',
    cityResults : [],
    typing : false,
    typingTimeoutFunc: () => {},
  }
  baseURL = 'http://ctp-zip-api.herokuapp.com/city/';

  handleCityChange = (event) =>{
    if(this.state.typing || event.target.value.length === 0){
      clearTimeout(this.state.typingTimeoutFunc);
    }
    this.setState({
      value : event.target.value,
      typing : true,
      typingTimeoutFunc: setTimeout(() => this.queryCity(), 1500),
    });
  }

  queryCity = () => {    
    let city = this.state.value; 
    fetch(this.baseURL +  city.toUpperCase())
      .then(rawRes => rawRes.json())
      .then(jsonRes => this.setState({
          cityResults : jsonRes, 
        }));
      return;
  }

  generateCityComponents = ()=>{
    const entries = [];
    if(this.state.cityResults){
      this.state.cityResults.forEach((zip)=>{
        entries.push(<Entry count = {entries.length + 1} zip = {zip}/>);
      });
      return entries;
    } 
    return;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
          <CitySearchField cityChanged={this.handleCityChange} cityValue={this.state.value} />
        <div>
          {this.generateCityComponents()}
        </div>
      </div>
    );
  }
}

export default App;
