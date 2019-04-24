import axios from 'axios';

const baseURL = "https://travels-backend.herokuapp.com";

const getAirplanes = (onComplete, onError) => {
  const url = baseURL + "/api/airplanes";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const AirplanesAPI = {
  getAirplanes,
};

export default AirplanesAPI;