import React, { Component } from 'react';
import { connect } from 'react-redux';

// material ui styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  description: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    height: 40,
  },
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <center>
        <form className={classes.container} noValidate>
          <h1 id='login-header'>Login</h1>
          <div>
              <TextField
                id="standard-with-placeholder"
                label="username"
                type="text"
                placeholder="Username"
                className={classes.textField}
                margin="normal"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                required
              />
          </div>
          <div>
              <TextField
                id="standard-with-placeholder"
                label="password"
                type="password"
                placeholder="Password"
                className={classes.textField}
                margin="normal"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                required
              />
          </div>
          <div>
            <button
              id="login-btn"
              value="Log In"
              onClick={this.login}
            >Login</button>
          </div>

        </form>
        </center>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'}) }}
          >
            Register
          </button>
          </center>

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));