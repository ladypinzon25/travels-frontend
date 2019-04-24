import React from 'react';
import HomePage from './components/HomePage/HomePage'
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
});
function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <HomePage/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
