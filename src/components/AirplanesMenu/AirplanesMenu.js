import React from 'react';
import Button from '@material-ui/core/Button';
import AirplanesAPI from '../../api/AirplanesAPI';
import './AirplanesMenu.css';

class AirplanesMenu extends React.Component {

  state = {
    airplanes: [],
    currentAirplane: []
  };

  componentDidMount() {
    this.getAirplanes();
  }

  getAirplanes = async () => {
    await AirplanesAPI.getAirplanes((response) => {
      this.setState({
        airplanes: response.data,
        currentAirplane: response.data[0]
      }, () => this.props.changeAirplane(this.state.airplanes[0]));
    });
  };

  pickAirplane = (airplane) => {
    this.setState({
      currentAirplane: airplane
    }, () => this.props.changeAirplane(this.state.currentAirplane));
  };

  render() {
    return (
      <div className="airplane-menu">
        {this.state.airplanes && this.state.airplanes.map(current =>
          <Button
            className="airplane-menu__option"
            variant={this.state.currentAirplane.name === current.name ? "contained" : "outlined"}
            color="primary"
            key={current.id}
            onClick={() => this.pickAirplane(current)}
          >
            {current.name}
          </Button>
        )}
      </div>
    );
  }
}

export default AirplanesMenu;
