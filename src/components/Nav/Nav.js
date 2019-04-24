import React from 'react';
import { FaSeedling, FaPlus, FaTint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from '../Dropdown/Dropdown';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">

       <Dropdown />

    
    <div className="nav-right">
      <Link className="nav-link" to="/info">
        <FaPlus /> Add Plant
      </Link>
      <Link className="nav-link" to="/allPlants">
        <FaSeedling /> Plant Inventory
      </Link>
      <Link className="nav-link" to="/dashboard">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? <div><FaTint />Dashboard</div> : 'Login / Register'}
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
