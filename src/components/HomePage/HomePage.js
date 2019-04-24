import React from 'react';
import AirplanesMenu from "../AirplanesMenu/AirplanesMenu";
import Form from "../Form/Form";
import './HomePage.css';

class HomePage extends React.Component {
  state = {
    selectedAirplane: {}
  };

  changeAirplane = (airplane) => {
    this.setState({
      selectedAirplane: airplane
    })
  };

  render() {
    return (
      <div className="home-page">
        <h1 className="home-page__title">Hello, welcome, we know you want to travel with {this.state.selectedAirplane && this.state.selectedAirplane.name}</h1>
        <AirplanesMenu changeAirplane={this.changeAirplane}/>
        <Form/>
      </div>
    );
  }
}

export default HomePage;
