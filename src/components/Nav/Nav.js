import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/dashboard">
      <h2 className="nav-title">Prime Solo Project</h2>
    </Link>
    {props.user.id && (
      <>
        <LogOutButton className = 'logout-button'/>
      </>
    )}
    <div className="nav-right">
      <Link className="nav-link" to="/info">
        Add Plant
      </Link>
      <Link className="nav-link" to="/allPlants">
        Plant Inventory
      </Link>
      <Link className="nav-link" to="/dashboard">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Dashboard' : 'Login / Register'}
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
