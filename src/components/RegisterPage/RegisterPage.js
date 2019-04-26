import React, { Component } from 'react';
import { connect } from 'react-redux';

//material styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  cssLabel: {
    '&$cssFocused': {
      color: '#9db1b1;',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#9db1b1;',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused': {
      borderColor: '#9db1b1;',
    },
  },
});


class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    phone: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.phone) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          phone: this.state.phone,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;


    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form>
          <h1 className='login-header'>Register User</h1>
          <center>
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
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    underline: classes.cssUnderline,
                  },
                }}
                required
              />

              {/* <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label> */}
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
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    underline: classes.cssUnderline,
                  },
                }}
                required
              />
              {/* <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label> */}
            </div>
            <div>
              <TextField
                id="standard-with-placeholder"
                label="phone number"
                type="number"
                placeholder="(   )   -    "
                className={classes.textField}
                margin="normal"
                value={this.state.phone}
                onChange={this.handleInputChangeFor('phone')}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    underline: classes.cssUnderline,
                  },
                }}
                required
              />
            </div>
            {/* <label htmlFor="Phone Number">
              Phone Number:
              <input
                type="number"
                name="phone number"
                value={this.state.phone}
                onChange={this.handleInputChangeFor('phone')}
              />
            </label> */}
            <div>
              <button
                className="login-btn"
                value="register"
                onClick={this.registerUser}
              >Register</button>
            </div>
          </center>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

