import React from 'react';
import UsersAPI from '../../api/UsersAPI';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import './Form.css';

class Form extends React.Component {
  state = {
    user: {
      name: '',
      email: '',
      phone: '',
      age: ''
    },
    errors: {
      name: false,
      email: false,
      phone: false,
      age: false,
    },
    ages: Array.from(Array(101 - 18).keys()).map(a => a + 18),
    showSuccessfulMessage: false,
    openSnackbar: false,
  };

  handleClickSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  sendUser = () => {
    if (!this.state.errors.name && !this.state.errors.email && !this.state.errors.phone && !this.state.errors.age) {
      UsersAPI.sendUserForm(this.state.user, () => {
        console.log("user send: " + this.state.user);
        this.handleClickSnackbar();
      });
      this.clearForm();
    }
  };

  clearForm = () => {
      this.setState({
        user: {
          name: '',
          email: '',
          phone: '',
          age: ''
        },
      })
  };

  validateFormData = () => {
    console.log("entre");
    const errorsCopy = {
      ...this.state.errors
    };

    errorsCopy.name = !this.state.user.name && 'The field can not be empty';
    errorsCopy.email = !this.state.user.email ? 'The field can not be empty' : !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(String(this.state.user.email).toLowerCase()) && 'The value entered is not an email';
    errorsCopy.phone = !this.state.user.phone ? 'The field can not be empty' : this.state.user.phone.length !== 10 && 'The number must have 10 digits';
    errorsCopy.age = !this.state.user.age && 'The field can not be empty';

    this.setState({errors: errorsCopy}, this.sendUser);
  };

  handleChange = name => event => {
    const userCopy = {
      ...this.state.user
    };
    userCopy[name] = event.target.value;
    this.setState({user: userCopy});
  };

  render() {
    return (
      <Card className="form">
        <CardContent className="form-container">
          <h3 className="form-container__title">Please complete the following form</h3>
          <TextField
            error={!!this.state.errors.name}
            id="standard-name"
            label={!this.state.errors.name ? 'name' : 'name: ' + this.state.errors.name}
            color="primary"
            className="form-container__text-field"
            value={this.state.user.name}
            onChange={this.handleChange('name')}
            margin="normal"
            type='text'
          />
          <TextField
            error={!!this.state.errors.email}
            id="standard-name"
            label={!this.state.errors.email ? 'email' : 'email: ' + this.state.errors.email}
            color="primary"
            className="form-container__text-field"
            value={this.state.user.email}
            onChange={this.handleChange('email')}
            margin="normal"
            type="email"
          />
          <TextField
            error={!!this.state.errors.phone}
            id="standard-name"
            label={!this.state.phone ? 'phone' : 'phone: ' + this.state.errors.phone}
            color="primary"
            className="form-container__text-field"
            value={this.state.user.phone}
            onChange={this.handleChange('phone')}
            margin="normal"
            type="number"
          />
          <TextField
            error={!!this.state.errors.age}
            id="standard-select-currency"
            select
            label={!this.state.errors.age ? 'age' : 'age: ' + this.state.errors['age']}
            className="form-container__text-field"
            value={this.state.user.age}
            onChange={this.handleChange('age')}
            margin="normal"
          >
            {this.state.ages && this.state.ages.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div className="actions-container">
            <Button
              className="form-container__send-info-button"
              color="primary"
              onClick={this.validateFormData}>Submit</Button>
          </div>
        </CardContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Your information was sent successfully</span>}
        />
      </Card>
    );
  }
}

export default Form;
