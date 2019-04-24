import axios from 'axios';

const baseURL = "http://localhost:3002";

const sendUserForm = (data, onComplete, onError) => {
  const url = baseURL + "/api/users";

  axios.post(url, {
    ...data
  })
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const UsersAPI = {
  sendUserForm,
};

export default UsersAPI;