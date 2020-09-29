import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      <h2> {props.locationText} </h2>
      <ul>
        <li> State: {props.state} </li>
        <li> Location: {props.location} </li>
        <li> Population (estimated): {props.population} </li>
        <li> Total Wages: {props.totalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <label> Zip Code: 
        <input type="text" id="zip" name="zip" onChange={props.zipChanged} value={props.zipValue}/>
      </label>
    </div>
  );

}


class App extends Component {
  state ={
    value: '',
  }
  baseURL = 'http://ctp-zip-api.herokuapp.com/zip/';
  handleZipChange(event){
    let zip = event.target.value;
    this.setState({value: zip}); 
    if (zip.length >= 5){ 
      fetch(this.baseURL + zip)
        .then(rawRes => rawRes.json())
        .then(jsonRes => this.setState({
          zipResults : jsonRes,
        }));
    } 
  }
  renderCityComponet(locationText, state, location, population, totalWages){
    return <City 
                locationText = {locationText}
                state = {state} 
                location = {location} 
                population = {population} 
                totalWages = {totalWages}

            /> ;
  }

  generateCityComponents(){
    if(!this.state.zipResults){
      return;
    }
    const entries = [];
    this.state.zipResults.forEach(res => {
      entries.push(this.renderCityComponet(
          res["LocationText"], 
          res["State"], 
          `(${res["Lat"]} , ${res["Long"]})`, 
          res["TotalWages"],
          res["EstimatedPopulation"],
        ));
    });
    return entries;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.value}/>
        <div>
          {this.generateCityComponents()}
        </div>
      </div>
    );
  }
}

export default App;
